(function () {
    "use strict";

    var root = document.documentElement;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var controller = "AbortController" in window ? new AbortController() : null;
    var eventOptions = controller ? { signal: controller.signal } : false;

    root.classList.add("js");

    var ready = function () {
        root.classList.add("is-ready");
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ready, eventOptions);
    } else {
        ready();
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

    var describeFields = function () {
        document.querySelectorAll(".form-field").forEach(function (field) {
            var input = field.querySelector("input, select, textarea");
            var descriptions = [];

            if (!input) {
                return;
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
            }, eventOptions);

            input.addEventListener("blur", function () {
                field.classList.remove("is-focused");
            }, eventOptions);

            input.addEventListener("input", setValueState, eventOptions);
            input.addEventListener("change", setValueState, eventOptions);
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
                var isHidden = input.type === "password";

                input.type = isHidden ? "text" : "password";
                button.classList.toggle("is-visible", isHidden);
                button.setAttribute("aria-pressed", isHidden ? "true" : "false");
                button.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
                focusInput(input);
            }, eventOptions);
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
                }, eventOptions);
            });

            select.addEventListener("change", sync, eventOptions);
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
                var value = input.value;

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

            input.addEventListener("input", normalizeCode, eventOptions);

            input.addEventListener("paste", function (event) {
                var clipboard = event.clipboardData || window.clipboardData;

                if (!clipboard) {
                    return;
                }

                event.preventDefault();
                input.value = clipboard.getData("text").replace(/\D/g, "").slice(0, 6);
                input.dispatchEvent(new Event("input", { bubbles: true }));
            }, eventOptions);

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
            }, eventOptions);
        });
    };

    var enhanceParallax = function () {
        if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        document.querySelectorAll("[data-parallax-root]").forEach(function (area) {
            var targets = area.querySelectorAll("[data-depth]");
            var frame = null;
            var nextX = 0;
            var nextY = 0;

            var paint = function () {
                targets.forEach(function (target) {
                    var depth = Number(target.dataset.depth || 12);
                    target.style.setProperty("--parallax-x", (nextX * depth).toFixed(2) + "px");
                    target.style.setProperty("--parallax-y", (nextY * depth).toFixed(2) + "px");
                });

                frame = null;
            };

            area.addEventListener("pointermove", function (event) {
                var rect = area.getBoundingClientRect();
                nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
                nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.45;

                if (!frame) {
                    frame = window.requestAnimationFrame(paint);
                }
            }, eventOptions);

            area.addEventListener("pointerleave", function () {
                nextX = 0;
                nextY = 0;

                if (!frame) {
                    frame = window.requestAnimationFrame(paint);
                }
            }, eventOptions);
        });
    };

    describeFields();
    enhancePasswords();
    enhanceRolePicker();
    enhanceCodeInputs();
    enhanceForms();
    enhanceParallax();
}());
