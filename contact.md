---
layout: page
title: Contact
permalink: /contact/
---

<form id="contact-form" action="https://nqw5473oc2.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer" method="POST" style="width:66.667%">
  <input type="text" name="_gotcha" style="display:none" />
  <p>
    <label for="name">Name</label>
    <input id="name" type="text" name="name" required>
  </p>
  <p>
    <label for="reply_to">Email</label>
    <input id="reply_to" type="email" name="reply_to" required>
  </p>
  <p>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="4" cols="32" required></textarea>
  </p>
  <p>
    <button class="button" type="submit">Send</button>
  </p>
</form>
<p id="js-form-response"></p>

<script>
(() => {
  const form = document.getElementById('contact-form');
  const formResponse = document.getElementById('js-form-response');

  form.onsubmit = e => {
    e.preventDefault();

    if (form._gotcha.value) return false;

    // Prepare data to send
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    // Construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    // Callback function
    xhr.onloadend = response => {
      formResponse.style.opacity = 1
      if (response.target.status === 200) {
        // The form submission was successful
        form.reset();
        formResponse.innerHTML = 'Thanks for the message. I’ll be in touch shortly.';
        formResponse.style.borderColor = '#036803'
        formResponse.style.color = '#036803'
      } else {
        // The form submission failed
        formResponse.innerHTML = 'Something went wrong';
        formResponse.style.borderColor = '#b60202'
        formResponse.style.color = '#b60202'
        console.error(JSON.parse(response.target.response).message);
      }
    };
  };
})();
</script>
