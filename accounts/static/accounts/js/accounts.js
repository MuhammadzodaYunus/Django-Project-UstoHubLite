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

    var enhanceScrollProgress = function () {
        var sync = function () {
            var scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            var progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);

            root.style.setProperty("--scroll-progress", progress.toFixed(4));
        };

        sync();
        window.addEventListener("scroll", sync, { passive: true });
        window.addEventListener("resize", sync);
    };

    var enhanceHashNavigation = function () {
        var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav__links a[href*='#']"));
        var sections = [];

        if (!links.length) {
            return;
        }

        var sync = function () {
            var currentHash = window.location.hash;

            links.forEach(function (link) {
                var isCurrent = Boolean(currentHash) && link.hash === currentHash && link.pathname === window.location.pathname;

                link.classList.toggle("is-active", isCurrent);

                if (isCurrent) {
                    link.setAttribute("aria-current", "location");
                } else if (!link.classList.contains("is-section-current") && link.getAttribute("aria-current") === "location") {
                    link.removeAttribute("aria-current");
                }
            });
        };

        var setSectionCurrent = function (id) {
            links.forEach(function (link) {
                var isCurrent = link.hash === "#" + id && link.pathname === window.location.pathname;

                link.classList.toggle("is-section-current", isCurrent);

                if (isCurrent) {
                    link.setAttribute("aria-current", "location");
                } else if (!link.classList.contains("is-active") && link.getAttribute("aria-current") === "location") {
                    link.removeAttribute("aria-current");
                }
            });
        };

        links.forEach(function (link) {
            if (!link.hash || link.pathname !== window.location.pathname) {
                return;
            }

            var section = document.querySelector(link.hash);

            if (section) {
                sections.push(section);
            }
        });

        if ("IntersectionObserver" in window && sections.length) {
            var observer = new IntersectionObserver(function (entries) {
                var visible = entries
                    .filter(function (entry) {
                        return entry.isIntersecting;
                    })
                    .sort(function (a, b) {
                        return b.intersectionRatio - a.intersectionRatio;
                    });

                if (visible[0] && visible[0].target.id) {
                    setSectionCurrent(visible[0].target.id);
                }
            }, {
                rootMargin: "-30% 0px -48% 0px",
                threshold: [0.12, 0.24, 0.4, 0.6]
            });

            sections.forEach(function (section) {
                observer.observe(section);
            });
        }

        window.addEventListener("hashchange", sync);
        sync();
    };

    var enhanceInteractionFeedback = function () {
        var surfaceSelector = [
            ".category-card",
            ".trust-grid div",
            ".workflow-preview",
            ".process-list li",
            ".empty-state",
            ".quality-card",
            ".pro-panel",
            ".final-cta__inner",
            ".summary-card",
            ".home-command-steps li",
            ".home-hero-proof__image",
            ".home-proof-card",
            ".home-problem-card",
            ".home-process-card",
            ".home-role-card",
            ".home-principle-card",
            ".home-final-cta__inner",
            ".repair-guidance__item",
            ".repair-live-brief",
            ".repair-live-brief__grid div",
            ".repair-list-summary",
            ".repair-request-card",
            ".professional-request-card",
            ".repair-detail-summary",
            ".repair-detail-meta-grid div",
            ".repair-detail-section",
            ".repair-status-track__item",
            ".repair-photo-card",
            ".photo-signal",
            ".repair-proof-rail span",
            ".service-photo-band__media",
            ".service-photo-band__content"
        ].join(", ");

        document.querySelectorAll(surfaceSelector).forEach(function (surface) {
            surface.classList.add("hover-surface");

            if (reduceMotion || !window.PointerEvent) {
                return;
            }

            var setPosition = function (event) {
                var rect = surface.getBoundingClientRect();
                var x = ((event.clientX - rect.left) / rect.width) * 100;
                var y = ((event.clientY - rect.top) / rect.height) * 100;
                var tiltX = ((x / 100) - 0.5) * 3.5;
                var tiltY = (0.5 - (y / 100)) * 3.5;

                surface.style.setProperty("--surface-x", x.toFixed(2) + "%");
                surface.style.setProperty("--surface-y", y.toFixed(2) + "%");
                surface.style.setProperty("--tilt-x", tiltX.toFixed(2) + "deg");
                surface.style.setProperty("--tilt-y", tiltY.toFixed(2) + "deg");
            };

            surface.addEventListener("pointerenter", function (event) {
                surface.classList.add("is-pointer-active");
                setPosition(event);
            });

            surface.addEventListener("pointermove", setPosition);

            surface.addEventListener("pointerleave", function () {
                surface.classList.remove("is-pointer-active");
                surface.classList.remove("is-surface-pressed");
                surface.style.setProperty("--tilt-x", "0deg");
                surface.style.setProperty("--tilt-y", "0deg");
            });

            surface.addEventListener("pointerdown", function () {
                surface.classList.add("is-surface-pressed");
            });

            surface.addEventListener("pointerup", function () {
                surface.classList.remove("is-surface-pressed");
            });

            surface.addEventListener("pointercancel", function () {
                surface.classList.remove("is-surface-pressed");
            });
        });

        document.querySelectorAll(".btn, .site-nav__links a, .nav-dashboard, .professional-nav__link, .professional-work-switcher a, .nav-toggle, .password-toggle, .role-option").forEach(function (control) {
            var press = function () {
                control.classList.add("is-pressed");
            };

            var release = function () {
                control.classList.remove("is-pressed");
            };

            control.addEventListener("pointerdown", press);
            control.addEventListener("pointerup", release);
            control.addEventListener("pointercancel", release);
            control.addEventListener("pointerleave", release);

            control.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    press();
                }
            });

            control.addEventListener("keyup", release);
            control.addEventListener("blur", release);
        });
    };

    var enhanceDepthScenes = function () {
        var scenes = document.querySelectorAll("[data-depth-scene]");

        if (!scenes.length || reduceMotion || !window.PointerEvent) {
            return;
        }

        scenes.forEach(function (scene) {
            var layers = Array.prototype.slice.call(scene.querySelectorAll("[data-depth-layer]"));

            if (!layers.length) {
                return;
            }

            var moveLayers = function (event) {
                var rect = scene.getBoundingClientRect();
                var x = ((event.clientX - rect.left) / rect.width) - 0.5;
                var y = ((event.clientY - rect.top) / rect.height) - 0.5;

                layers.forEach(function (layer) {
                    var depth = Number(layer.dataset.depthLayer || "1");
                    var moveX = (x * depth * 16).toFixed(2) + "px";
                    var moveY = (y * depth * 12).toFixed(2) + "px";

                    layer.style.setProperty("--depth-x", moveX);
                    layer.style.setProperty("--depth-y", moveY);
                });
            };

            var resetLayers = function () {
                layers.forEach(function (layer) {
                    layer.style.setProperty("--depth-x", "0px");
                    layer.style.setProperty("--depth-y", "0px");
                });
            };

            scene.addEventListener("pointermove", moveLayers);
            scene.addEventListener("pointerleave", resetLayers);
        });
    };

    var enhanceScrollReveals = function () {
        var revealSelector = [
            ".hero-copy",
            ".hero-panel",
            ".trust-strip li",
            ".workflow-preview",
            ".section-heading",
            ".trust-grid div",
            ".category-card",
            ".process-list li",
            ".empty-state",
            ".quality-card",
            ".pro-panel",
            ".final-cta__inner",
            ".auth-card",
            ".summary-card",
            ".home-command-steps li",
            ".home-hero-proof",
            ".home-hero-proof__image",
            ".home-proof-card",
            ".home-problem-card",
            ".home-process-card",
            ".home-role-card",
            ".home-category-card",
            ".home-principle-card",
            ".home-final-cta__inner",
            ".repair-guidance__item",
            ".repair-live-brief",
            ".repair-live-brief__grid div",
            ".repair-list-summary",
            ".repair-list-heading",
            ".repair-request-card",
            ".professional-request-card",
            ".repair-detail-summary",
            ".repair-detail-meta-grid div",
            ".repair-detail-section",
            ".repair-status-track__item",
            ".repair-photo-showcase",
            ".repair-photo-card",
            ".photo-signal",
            ".repair-proof-rail",
            ".service-photo-band",
            ".service-photo-band__media",
            ".service-photo-band__content"
        ].join(", ");

        var items = Array.prototype.slice.call(document.querySelectorAll(revealSelector));

        if (!items.length) {
            return;
        }

        items.forEach(function (item, index) {
            item.classList.add("reveal-on-scroll");

            if (item.classList.contains("hero-copy")) {
                item.classList.add("reveal-from-left");
            }

            if (item.classList.contains("hero-panel") || item.classList.contains("auth-card")) {
                item.classList.add("reveal-from-right");
            }

            item.style.setProperty("--reveal-delay", Math.min((index % 8) * 45, 260) + "ms");
        });

        if (reduceMotion || !("IntersectionObserver" in window)) {
            items.forEach(function (item) {
                item.classList.add("is-visible");
                item.style.removeProperty("--reveal-delay");
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.16
        });

        items.forEach(function (item) {
            observer.observe(item);
        });
    };

    var enhanceCounters = function () {
        var counters = Array.prototype.slice.call(document.querySelectorAll(".metric, .summary-card strong, .repair-list-summary__metric strong"));
        var numericCounters = counters.filter(function (counter) {
            return /^\d+$/.test(counter.textContent.trim());
        });

        if (!numericCounters.length || reduceMotion) {
            return;
        }

        var runCounter = function (counter) {
            var target = Number(counter.textContent.trim());
            var start = performance.now();
            var duration = 720;

            var tick = function (now) {
                var progress = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);

                counter.textContent = Math.round(target * eased);

                if (progress < 1) {
                    window.requestAnimationFrame(tick);
                } else {
                    counter.textContent = target;
                }
            };

            counter.textContent = "0";
            window.requestAnimationFrame(tick);
        };

        if (!("IntersectionObserver" in window)) {
            numericCounters.forEach(runCounter);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                runCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.7
        });

        numericCounters.forEach(function (counter) {
            observer.observe(counter);
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
            var controls = Array.prototype.slice.call(field.querySelectorAll("input, select, textarea"));
            var descriptions = [];

            if (!controls.length) {
                return;
            }

            field.querySelectorAll(".field-hint, .field-errors").forEach(function (message) {
                if (message.id) {
                    descriptions.push(message.id);
                }
            });

            controls.forEach(function (input) {
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

                if (descriptions.length) {
                    input.setAttribute("aria-describedby", descriptions.join(" "));
                }

                if (field.classList.contains("form-field--error")) {
                    input.setAttribute("aria-invalid", "true");
                }
            });

            var setValueState = function () {
                var hasValue = controls.some(function (input) {
                    if (input.type === "radio" || input.type === "checkbox") {
                        return input.checked;
                    }

                    return Boolean(input.value);
                });

                field.classList.toggle("has-value", hasValue);
            };

            field.addEventListener("focusin", function () {
                field.classList.add("is-focused");
            });

            field.addEventListener("focusout", function () {
                window.setTimeout(function () {
                    if (!field.contains(document.activeElement)) {
                        field.classList.remove("is-focused");
                    }
                }, 0);
            });

            controls.forEach(function (input) {
                input.addEventListener("input", setValueState);
                input.addEventListener("change", setValueState);
            });

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
            var radios = Array.prototype.slice.call(picker.querySelectorAll("input[type='radio'][data-role-value]"));
            var select = picker.querySelector("select");
            var optionButtons = picker.querySelectorAll("button[data-role-value]");

            if (radios.length) {
                var syncRadios = function () {
                    radios.forEach(function (radio) {
                        var option = radio.closest("[data-role-option]");
                        var selected = radio.checked;

                        if (option) {
                            option.classList.toggle("is-selected", selected);
                        }
                    });
                };

                radios.forEach(function (radio) {
                    radio.addEventListener("change", syncRadios);
                    radio.addEventListener("keydown", function (event) {
                        var currentIndex = radios.indexOf(radio);
                        var targetIndex = null;

                        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                            targetIndex = (currentIndex + 1) % radios.length;
                        }

                        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                            targetIndex = (currentIndex - 1 + radios.length) % radios.length;
                        }

                        if (event.key === "Home") {
                            targetIndex = 0;
                        }

                        if (event.key === "End") {
                            targetIndex = radios.length - 1;
                        }

                        if (targetIndex === null) {
                            return;
                        }

                        event.preventDefault();
                        radios[targetIndex].checked = true;
                        radios[targetIndex].dispatchEvent(new Event("change", { bubbles: true }));
                        focusInput(radios[targetIndex]);
                    });
                });

                syncRadios();
                return;
            }

            if (!select || !optionButtons.length) {
                return;
            }

            var sync = function () {
                optionButtons.forEach(function (option) {
                    var selected = option.dataset.roleValue === select.value;

                    option.classList.toggle("is-selected", selected);
                    option.setAttribute("aria-pressed", selected ? "true" : "false");
                });
            };

            optionButtons.forEach(function (option) {
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

    var enhanceRepairBrief = function () {
        document.querySelectorAll("[data-repair-brief]").forEach(function (brief) {
            var card = brief.closest(".repair-card") || document;
            var titleInput = card.querySelector("input[name='title']");
            var categorySelect = card.querySelector("select[name='category']");
            var urgencySelect = card.querySelector("select[name='urgency']");
            var addressInput = card.querySelector("input[name='address']");
            var titleTarget = brief.querySelector("[data-repair-brief-title]");
            var categoryTarget = brief.querySelector("[data-repair-brief-category]");
            var urgencyTarget = brief.querySelector("[data-repair-brief-urgency]");
            var addressTarget = brief.querySelector("[data-repair-brief-address]");

            var getSelectedText = function (select, fallback) {
                if (!select || select.selectedIndex < 0) {
                    return fallback;
                }

                var option = select.options[select.selectedIndex];
                var text = option ? option.textContent.trim() : "";

                return text || fallback;
            };

            var sync = function () {
                if (titleTarget) {
                    titleTarget.textContent = titleInput && titleInput.value.trim() ? titleInput.value.trim() : "Untitled repair request";
                }

                if (categoryTarget) {
                    categoryTarget.textContent = getSelectedText(categorySelect, "Choose a service category");
                }

                if (urgencyTarget) {
                    urgencyTarget.textContent = getSelectedText(urgencySelect, "Set urgency");
                }

                if (addressTarget) {
                    addressTarget.textContent = addressInput && addressInput.value.trim() ? addressInput.value.trim() : "Add the service address";
                }
            };

            [titleInput, categorySelect, urgencySelect, addressInput].forEach(function (control) {
                if (!control) {
                    return;
                }

                control.addEventListener("input", sync);
                control.addEventListener("change", sync);
            });

            sync();
        });
    };

    enhanceHeader();
    enhanceScrollProgress();
    enhanceHashNavigation();
    enhanceInteractionFeedback();
    enhanceDepthScenes();
    enhanceScrollReveals();
    enhanceCounters();
    describeFields();
    enhancePasswords();
    enhanceRolePicker();
    enhanceCodeInputs();
    enhanceForms();
    enhanceRepairBrief();
}());
