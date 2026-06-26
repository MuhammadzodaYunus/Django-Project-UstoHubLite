(function () {
    "use strict";

    var root = document.documentElement;
    var body = document.body;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("js");

    var onReady = function () {
        root.classList.add("is-ready");
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", onReady);
    } else {
        onReady();
    }

    var focusInput = function (input) {
        if (!input) {
            return;
        }

        try {
            input.focus({ preventScroll: true });
        } catch (error) {
            input.focus();
        }
    };

    var enhanceHeader = function () {
        var header = document.querySelector("[data-site-header]");
        var toggle = document.querySelector("[data-nav-toggle]");
        var panel = document.querySelector("[data-nav-panel]");

        if (header) {
            var syncHeader = function () {
                header.classList.toggle("is-scrolled", window.scrollY > 8);
            };

            syncHeader();

            if (!reduceMotion) {
                window.addEventListener("scroll", syncHeader, { passive: true });
            } else {
                window.addEventListener("scroll", syncHeader);
            }
        }

        if (!toggle || !panel) {
            return;
        }

        var closePanel = function () {
            toggle.setAttribute("aria-expanded", "false");
            panel.classList.remove("is-open");
            body.classList.remove("is-nav-open");
        };

        toggle.addEventListener("click", function () {
            var isOpen = toggle.getAttribute("aria-expanded") === "true";

            toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
            panel.classList.toggle("is-open", !isOpen);
            body.classList.toggle("is-nav-open", !isOpen);
        });

        panel.querySelectorAll("a, button").forEach(function (item) {
            item.addEventListener("click", function () {
                if (window.matchMedia("(max-width: 980px)").matches) {
                    closePanel();
                }
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closePanel();
            }
        });
    };

    var describeFields = function () {
        var autocomplete = {
            username: "username",
            email: "email",
            phone_number: "tel",
            password: "current-password",
            password1: "new-password",
            password2: "new-password",
            code: "one-time-code"
        };

        document.querySelectorAll(".form-field").forEach(function (field) {
            var input = field.querySelector("input, select, textarea");
            var descriptions = [];

            if (!input) {
                return;
            }

            if (input.name && autocomplete[input.name]) {
                input.setAttribute("autocomplete", autocomplete[input.name]);
            }

            if (input.name === "phone_number" && input.tagName === "INPUT") {
                input.setAttribute("type", "tel");
                input.setAttribute("inputmode", "tel");
            }

            if (input.name === "username") {
                input.setAttribute("autocapitalize", "none");
                input.setAttribute("spellcheck", "false");
            }

            field.querySelectorAll(".field-hint, .field-errors").forEach(function (message) {
                if (message.id) {
                    descriptions.push(message.id);
                }
            });

            if (descriptions.length) {
                input.setAttribute("aria-describedby", descriptions.join(" "));
            }

            if (field.classList.contains("form-field--error")) {
                input.setAttribute("aria-invalid", "true");
            }

            var setValueState = function () {
                field.classList.toggle("has-value", Boolean(input.value));
            };

            input.addEventListener("focus", function () {
                field.classList.add("is-focused");
            });

            input.addEventListener("blur", function () {
                field.classList.remove("is-focused");
            });

            input.addEventListener("input", setValueState);
            input.addEventListener("change", setValueState);
            setValueState();
        });
    };

    var enhancePasswords = function () {
        document.querySelectorAll("[data-password-toggle]").forEach(function (button) {
            var control = button.closest(".password-control");
            var input = control ? control.querySelector("input") : null;

            if (!input) {
                return;
            }

            button.addEventListener("click", function () {
                var shouldShow = input.type === "password";

                input.type = shouldShow ? "text" : "password";
                button.classList.toggle("is-visible", shouldShow);
                button.setAttribute("aria-pressed", shouldShow ? "true" : "false");
                button.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
                focusInput(input);
            });
        });
    };

    var enhanceRolePicker = function () {
        document.querySelectorAll("[data-role-picker]").forEach(function (picker) {
            var select = picker.querySelector("select");
            var options = picker.querySelectorAll("[data-role-value]");

            if (!select || !options.length) {
                return;
            }

            var sync = function () {
                options.forEach(function (option) {
                    var selected = option.dataset.roleValue === select.value;

                    option.classList.toggle("is-selected", selected);
                    option.setAttribute("aria-pressed", selected ? "true" : "false");
                });
            };

            options.forEach(function (option) {
                option.addEventListener("click", function () {
                    select.value = option.dataset.roleValue;
                    select.dispatchEvent(new Event("change", { bubbles: true }));
                    sync();
                });
            });

            select.addEventListener("change", sync);
            sync();
        });
    };

    var enhanceCodeInputs = function () {
        document.querySelectorAll("input[name='code']").forEach(function (input) {
            var shell = input.closest("[data-code-shell]");
            var slots = shell ? shell.querySelectorAll(".code-slots span") : [];

            input.setAttribute("inputmode", "numeric");
            input.setAttribute("autocomplete", "one-time-code");
            input.setAttribute("pattern", "[0-9]*");

            if (!input.getAttribute("maxlength")) {
                input.setAttribute("maxlength", "6");
            }

            var renderSlots = function () {
                var value = input.value || "";

                slots.forEach(function (slot, index) {
                    var character = value[index] || "";

                    slot.textContent = character;
                    slot.classList.toggle("is-filled", Boolean(character));
                });
            };

            var normalizeCode = function () {
                input.value = input.value.replace(/\D/g, "").slice(0, 6);
                renderSlots();
            };

            input.addEventListener("input", normalizeCode);

            input.addEventListener("paste", function (event) {
                var clipboard = event.clipboardData || window.clipboardData;

                if (!clipboard) {
                    return;
                }

                event.preventDefault();
                input.value = clipboard.getData("text").replace(/\D/g, "").slice(0, 6);
                input.dispatchEvent(new Event("input", { bubbles: true }));
            });

            renderSlots();
        });
    };

    var enhanceForms = function () {
        document.querySelectorAll("[data-auth-form]").forEach(function (form) {
            form.addEventListener("submit", function () {
                var submitButton = form.querySelector("[data-submit-button]");

                form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[name='code']").forEach(function (input) {
                    input.value = input.value.trim();
                });

                if (submitButton) {
                    submitButton.classList.add("is-loading");
                    submitButton.setAttribute("aria-busy", "true");
                    submitButton.disabled = true;
                }
            });
        });
    };

    enhanceHeader();
    describeFields();
    enhancePasswords();
    enhanceRolePicker();
    enhanceCodeInputs();
    enhanceForms();
}());
