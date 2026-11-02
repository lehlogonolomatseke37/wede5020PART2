/* =====================================================================
   forms.js — validation and processing for the enquiry and contact forms
   Both forms keep their HTML5 attributes (required, type, maxlength) as
   the first line of defence. This script adds `novalidate` at runtime so
   the browser's own bubbles step aside for messages that name the field
   and say how to fix it — and so validation still runs if a visitor
   disables HTML5 validation.
   ===================================================================== */

(function () {
    'use strict';

    /* The address every contact message is addressed to. Changing this
       one constant redirects the site's mail. */
    var CONTACT_EMAIL = 'neighbourlyspace@gmail.com';
    var WHATSAPP_NUMBER = '27684570771';

    var escapeHTML = window.NS.escapeHTML;

    /* ---------------------------------------------------------------
       1. Field-level rules
       Each rule returns an error string, or '' when the value is valid.
       --------------------------------------------------------------- */
    var rules = {
        name: function (value) {
            if (!value) return 'Please enter your name so we know who to reply to.';
            if (value.length < 2) return 'That name looks too short — please enter your full name.';
            if (!/^[A-Za-zÀ-ÿ' .-]{2,60}$/.test(value)) return 'Please use letters only (apostrophes and hyphens are fine).';
            return '';
        },

        email: function (value) {
            if (!value) return 'Please enter your email address.';
            if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value)) return 'That email address is missing something — check for a typo, for example name@example.com.';
            return '';
        },

        phone: function (value) {
            if (!value) return 'Please enter a phone number we can reach you on.';
            var digits = value.replace(/[\s()-]/g, '');
            /* South African numbers: 0XX XXX XXXX or +27 XX XXX XXXX */
            if (!/^(0\d{9}|\+27\d{9})$/.test(digits)) return 'Enter a South African number, for example 082 123 4567 or +27 82 123 4567.';
            return '';
        },

        select: function (value) {
            if (!value) return 'Please choose an option from the list.';
            return '';
        },

        date: function (value) {
            if (!value) return 'Please choose the date you would like us to come out.';

            var chosen = new Date(value + 'T00:00:00');
            var today = new Date();
            today.setHours(0, 0, 0, 0);

            if (isNaN(chosen.getTime())) return 'That date could not be read — please pick one from the calendar.';
            if (chosen < today) return 'Please choose today or a date in the future.';

            var ninetyDays = new Date(today);
            ninetyDays.setDate(ninetyDays.getDate() + 90);
            if (chosen > ninetyDays) return 'We only schedule 90 days ahead — please choose an earlier date.';

            return '';
        },

        message: function (value) {
            if (!value) return 'Please tell us briefly what you need.';
            if (value.length < 20) return 'Please give us a little more detail — at least 20 characters so we can quote accurately.';
            if (value.length > 600) return 'Please keep the description under 600 characters.';
            return '';
        },

        optionalPhone: function (value) {
            if (!value) return '';
            return rules.phone(value);
        }
    };

    /* ---------------------------------------------------------------
       2. Validation plumbing shared by both forms
       --------------------------------------------------------------- */
    function validateField(field, rule) {
        var error = rules[rule](field.value.trim());
        setFieldState(field, error);
        return error === '';
    }

    function setFieldState(field, error) {
        var errorBox = document.getElementById(field.id + '-error');
        var group = field.closest('.field');

        if (error) {
            field.setAttribute('aria-invalid', 'true');
            if (group) group.classList.add('has-error');
            if (errorBox) errorBox.textContent = error;
        } else {
            field.removeAttribute('aria-invalid');
            if (group) group.classList.remove('has-error');
            if (errorBox) errorBox.textContent = '';
        }
    }

    function wire(form, fields) {
        form.setAttribute('novalidate', 'novalidate');

        Object.keys(fields).forEach(function (id) {
            var field = document.getElementById(id);
            if (!field) return;

            /* Validate when the visitor leaves a field, and then live on
               every keystroke — but only once that field has already been
               marked invalid, so nobody is told they are wrong mid-word. */
            field.addEventListener('blur', function () { validateField(field, fields[id]); });

            field.addEventListener('input', function () {
                if (field.getAttribute('aria-invalid') === 'true') validateField(field, fields[id]);
            });
        });
    }

    function validateAll(fields) {
        var firstInvalid = null;

        var valid = Object.keys(fields).reduce(function (acc, id) {
            var field = document.getElementById(id);
            if (!field) return acc;

            var ok = validateField(field, fields[id]);
            if (!ok && !firstInvalid) firstInvalid = field;
            return acc && ok;
        }, true);

        if (firstInvalid) {
            firstInvalid.focus();
            firstInvalid.scrollIntoView({ behavior: window.NS.reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }

        return valid;
    }

    function liveCounter(fieldId, counterId, max) {
        var field = document.getElementById(fieldId);
        var counter = document.getElementById(counterId);
        if (!field || !counter) return;

        function update() {
            var used = field.value.length;
            counter.textContent = used + ' / ' + max;
            counter.classList.toggle('is-over', used > max);
        }

        field.addEventListener('input', update);
        update();
    }

    /* =================================================================
       3. ENQUIRY FORM — validates, then processes the request and
       responds with an indicative cost and the next available slot.
       ================================================================= */
    function initEnquiryForm() {
        var form = document.getElementById('enquiry-form');
        if (!form) return;

        var fields = {
            'fullname': 'name',
            'email': 'email',
            'phone': 'phone',
            'service': 'select',
            'urgency': 'select',
            'preferred-date': 'date',
            'message': 'message'
        };

        wire(form, fields);
        liveCounter('message', 'message-counter', 600);
        preselectService();

        form.addEventListener('submit', function (e) {
            e.preventDefault();                 /* handled in the browser */
            if (!validateAll(fields)) return;
            respond();
        });

        /* A link such as enquiry.html?service=plumbing arrives from the
           services page, so the visitor does not re-pick what they just
           clicked. */
        function preselectService() {
            var requested = new URLSearchParams(window.location.search).get('service');
            if (!requested) return;

            var select = document.getElementById('service');
            Array.prototype.forEach.call(select.options, function (option) {
                if (option.value === requested) select.value = requested;
            });
        }

        /* Indicative pricing. Real quotes are confirmed by the
           professional after the site visit — the figures here set
           expectations the way a real service business would. */
        var PRICING = {
            plumbing: [450, 1800], electrical: [550, 2400], garden: [350, 1200],
            cleaning: [400, 1500], handyman: [300, 1400], pool: [500, 1600],
            painting: [1200, 6500], security: [950, 7500], other: [350, 2500]
        };

        var URGENCY = {
            emergency: { label: 'Emergency (today)', multiplier: 1.35, hours: 3 },
            urgent: { label: 'Urgent (within 48 hours)', multiplier: 1.15, hours: 24 },
            standard: { label: 'Standard (this week)', multiplier: 1, hours: 72 }
        };

        function respond() {
            var service = document.getElementById('service');
            var urgency = document.getElementById('urgency').value;
            var name = document.getElementById('fullname').value.trim();
            var date = document.getElementById('preferred-date').value;

            var band = PRICING[service.value] || PRICING.other;
            var rate = URGENCY[urgency] || URGENCY.standard;

            var low = Math.round(band[0] * rate.multiplier / 10) * 10;
            var high = Math.round(band[1] * rate.multiplier / 10) * 10;

            var reference = buildReference(service.value);
            var callback = new Date(Date.now() + rate.hours * 60 * 60 * 1000);

            var panel = document.getElementById('enquiry-response');

            panel.innerHTML =
                '<p class="response-badge">Request received</p>' +
                '<h3>Thanks, ' + escapeHTML(name.split(' ')[0]) + ' — here is what to expect.</h3>' +
                '<dl class="response-facts">' +
                '<div><dt>Reference</dt><dd>' + reference + '</dd></div>' +
                '<div><dt>Service</dt><dd>' + escapeHTML(service.options[service.selectedIndex].text) + '</dd></div>' +
                '<div><dt>Priority</dt><dd>' + rate.label + '</dd></div>' +
                '<div><dt>Indicative cost</dt><dd>R' + low + ' – R' + high + '</dd></div>' +
                '<div><dt>Preferred date</dt><dd>' + formatDate(date) + '</dd></div>' +
                '<div><dt>We will call you by</dt><dd>' + formatDateTime(callback) + '</dd></div>' +
                '</dl>' +
                '<p class="response-note">This is an estimate based on similar jobs in your area. The professional confirms the final price with you before any work starts.</p>' +
                '<p class="response-actions">' +
                '<a class="btn btn-primary" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' +
                encodeURIComponent('Hi NeighbourlySpace, I have just submitted enquiry ' + reference + '.') +
                '" target="_blank" rel="noopener">Follow up on WhatsApp</a>' +
                '<button class="btn btn-ghost" type="button" id="enquiry-reset">Send another request</button>' +
                '</p>';

            panel.hidden = false;
            form.hidden = true;
            panel.setAttribute('tabindex', '-1');
            panel.focus();
            panel.scrollIntoView({ behavior: window.NS.reduceMotion ? 'auto' : 'smooth', block: 'center' });

            document.getElementById('enquiry-reset').addEventListener('click', function () {
                form.reset();
                panel.hidden = true;
                form.hidden = false;
                liveCounter('message', 'message-counter', 600);
                document.getElementById('fullname').focus();
            });
        }

        function buildReference(service) {
            var prefix = (service || 'gen').slice(0, 3).toUpperCase();
            var stamp = new Date();
            /* Zero-padded so every reference is the same length, which is
               what makes them easy to read out over the phone. */
            var pad = function (n) { return String(n).padStart(2, '0'); };
            var serial = pad(stamp.getDate()) + pad(stamp.getMonth() + 1) + '-' +
                pad(stamp.getHours()) + pad(stamp.getMinutes()) + pad(stamp.getSeconds());
            return 'NS-' + prefix + '-' + serial;
        }
    }

    /* =================================================================
       4. CONTACT FORM — validates, compiles the message into an email
       addressed to the business, and hands it to the visitor's mail app.
       ================================================================= */
    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;

        var fields = {
            'contact-name': 'name',
            'contact-email': 'email',
            'contact-phone': 'optionalPhone',
            'contact-type': 'select',
            'contact-message': 'message'
        };

        wire(form, fields);
        liveCounter('contact-message', 'contact-message-counter', 600);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateAll(fields)) return;
            compileEmail();
        });

        function compileEmail() {
            var name = document.getElementById('contact-name').value.trim();
            var email = document.getElementById('contact-email').value.trim();
            var phone = document.getElementById('contact-phone').value.trim();
            var type = document.getElementById('contact-type');
            var message = document.getElementById('contact-message').value.trim();

            var subject = '[' + type.options[type.selectedIndex].text + '] Website message from ' + name;

            /* Built line by line so the email reads like a letter rather
               than a dump of form fields. */
            var body = [
                'Hello NeighbourlySpace team,',
                '',
                message,
                '',
                '—',
                'Name: ' + name,
                'Email: ' + email,
                'Phone: ' + (phone || 'not provided'),
                'Message type: ' + type.options[type.selectedIndex].text,
                'Sent from: neighbourlyspace.co.za contact form',
                'Date: ' + new Date().toLocaleString('en-ZA')
            ].join('\n');

            var mailto = 'mailto:' + CONTACT_EMAIL +
                '?subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            var panel = document.getElementById('contact-response');

            panel.innerHTML =
                '<p class="response-badge">Message ready to send</p>' +
                '<h3>Your email has been prepared.</h3>' +
                '<p>We have compiled your message into an email addressed to <strong>' + CONTACT_EMAIL + '</strong>. ' +
                'Press the button below to open it in your email app and send it — nothing leaves your device until you do.</p>' +
                '<div class="response-preview"><p><strong>Subject:</strong> ' + escapeHTML(subject) + '</p>' +
                '<pre>' + escapeHTML(body) + '</pre></div>' +
                '<p class="response-actions">' +
                '<a class="btn btn-primary" id="contact-send" href="' + mailto + '">Open and send the email</a>' +
                '<a class="btn btn-ghost" href="https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message.slice(0, 300)) + '" target="_blank" rel="noopener">Send on WhatsApp instead</a>' +
                '<button class="btn btn-ghost" type="button" id="contact-edit">Edit the message</button>' +
                '</p>';

            panel.hidden = false;
            form.hidden = true;
            panel.setAttribute('tabindex', '-1');
            panel.focus();
            panel.scrollIntoView({ behavior: window.NS.reduceMotion ? 'auto' : 'smooth', block: 'center' });

            document.getElementById('contact-edit').addEventListener('click', function () {
                panel.hidden = true;
                form.hidden = false;
                document.getElementById('contact-message').focus();
            });
        }
    }

    /* ---------------------------------------------------------------
       5. Small date helpers, written out so the output reads naturally
       --------------------------------------------------------------- */
    function formatDate(value) {
        var date = new Date(value + 'T00:00:00');
        return date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    function formatDateTime(date) {
        return date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' }) +
            ' at ' + date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
    }

    initEnquiryForm();
    initContactForm();
})();
