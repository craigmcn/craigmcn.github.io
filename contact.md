---
layout: page
title: Contact
permalink: /contact/
---

<form action="https://nqw5473oc2.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer" method="POST" style="width:66.667%">
  <p>
    <label for="name">Name</label>
    <input id="name" type="text" name="name" required>
  </p>
  <p>
    <label for="email">Email</label>
    <input id="email" type="email" name="replyto" required>
  </p>
  <p>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="4" cols="32" required></textarea>
  </p>
  <input type="text" name="_gotcha" style="display:none" />
  <p>
    <button type="submit">Send</button>
  </p>
</form>
<p id="js-form-response"></p>

<script>
  (() => {
    const form = document.querySelector('form');
    const formResponse = document.querySelector('js-form-response');

    form.onsubmit = e => {
      e.preventDefault();

      // Prepare data to send
      const data = {};
      const formElements = Array.from(form);
      formElements.map(input => (data[input.name] = input.value));

      // Log what our lambda function will receive
      console.log(JSON.stringify(data));

      // Construct an HTTP request
      var xhr = new XMLHttpRequest();
      xhr.open(form.method, form.action, true);
      xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      // Send the collected data as JSON
      xhr.send(JSON.stringify(data));

      // Callback function
      xhr.onloadend = response => {
        if (response.target.status === 200) {
          // The form submission was successful
          form.reset();
          formResponse.innerHTML = 'Thanks for the message. I’ll be in touch shortly.';
        } else {
          // The form submission failed
          formResponse.innerHTML = 'Something went wrong';
          console.error(JSON.parse(response.target.response).message);
        }
      };
    };
  })();
</script>
