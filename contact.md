---
title: Contact
permalink: "/contact/"
layout: page
---

<form id="contact-form" action="https://formspree.io/f/mnjyygrj" method="POST" style="width:66.667%">
  <p class="field-wrapper">
    <span class="sr-only">If you are human, please leave this field blank.</span>
    <input type="text" name="_gotcha" tabindex="-1" autocomplete="nope" />
  </p>
  <p>
    <label for="name">Name</label>
    <input id="name" type="text" name="name" autocomplete="name" required data-fs-field>
    <span data-fs-error="name"></span>
  </p>
  <p>
    <label for="reply_to">Email</label>
    <input id="reply_to" type="email" name="reply_to" autocomplete="email" required data-fs-field>
    <span data-fs-error="email"></span>
  </p>
  <p>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="4" cols="32" required data-fs-field></textarea>
    <span data-fs-error="message"></span>
  </p>
  <p>
    <button class="button" type="submit" data-fs-submit-btn>Send</button>
  </p>
</form>

<div style="margin-top: 1rem;" data-fs-success>Thanks for your submission!</div>
<div style="margin-top: 1rem;" data-fs-error>Oops! There was a problem submitting your form.</div>

<script>
  window.formspree =
    window.formspree ||
    function () {
      (formspree.q = formspree.q || []).push(arguments);
    };
  formspree("initForm", {
    formElement: "#contact-form",
    formId: "mnjyygrj",
  });
</script>
<script src="https://unpkg.com/@formspree/ajax@1" defer></script>
