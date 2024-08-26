const payButton = document.getElementById('pay-button');
const payViaAppButton = document.getElementById('pay-via-app-button');
const qrCodeContainer = document.getElementById('qr-code-container');

// UPI ID, Name, Transaction Note, and Currency as constants
const upiID = 'memymyselfanish@okicici';  // Ensure this is the correct UPI ID
const name = 'museum-eg';    // Replace with your merchant name or purpose
const transactionNote = 'Donation for museum';
const currency = 'INR';

payButton.addEventListener('click', function () {
  const amount = document.getElementById('amount').value;
  if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
  }

  // Simplified UPI URL format (without payee name and transaction note)
  const upiUrl = `upi://pay?pa=${upiID}&am=${amount}&cu=${currency}`;

  // Generate QR code
  const qr = new QRious({
      element: document.getElementById('qr-code'),
      value: upiUrl,
      size: 250 // Size of the QR code
  });

  // Store UPI URL for use by the Pay via App button
  payViaAppButton.setAttribute('data-upi-url', upiUrl);

  // Show QR code container and adjust button margin
  qrCodeContainer.style.display = 'block';
  payViaAppButton.style.marginTop = '20px';
});

payViaAppButton.addEventListener('click', function () {
  const amount = document.getElementById('amount').value;
  if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
  }

  // Check if the amount is within a certain limit to avoid errors
  if (parseInt(amount) > 10000) {  // Example: setting an arbitrary limit
      alert('The amount exceeds the transaction limit. Please enter a smaller amount.');
      return;
  }

  // UPI deep link for Google Pay
  const upiUrl = `tez://upi/pay?pa=${upiID}&am=${amount}&cu=${currency}`;

  console.log("UPI URL: ", upiUrl); // Logs the generated UPI URL to the console for debugging.

  // Redirect to Google Pay using the custom intent
  window.location.href = upiUrl;

  // Hide QR code container and adjust button margin
  qrCodeContainer.style.display = 'none';
  payViaAppButton.style.marginTop = '5px';
});
