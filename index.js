const payButton = document.getElementById('pay-button');
const payViaAppButton = document.getElementById('pay-via-app-button');
const downloadReceiptButton = document.getElementById('download-receipt');
const qrCodeContainer = document.getElementById('qr-code-container');

// UPI ID, Name, Transaction Note, and Currency as constants
const upiID = 'manishayk22@okhdfcbank';  // Ensure this is the correct UPI ID
const name = 'museum-eg';    // Replace with your merchant name or purpose
const currency = 'INR';

payButton.addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const upiUrl = `upi://pay?pa=${upiID}&am=${amount}&cu=${currency}`;

    // Generate QR code
    const qr = new QRious({
        element: document.getElementById('qr-code'),
        value: upiUrl,
        size: 250 // Size of the QR code
    });

    // Show QR code container and adjust button margin
    qrCodeContainer.style.display = 'block';
    payViaAppButton.style.marginTop = '20px';
    downloadReceiptButton.style.display = 'none';
});

payViaAppButton.addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    const recipientName = document.getElementById('name').value;
    
    if (!amount || amount <= 0 || !recipientName) {
        alert('Please enter a valid amount and name.');
        return;
    }

    const upiUrl = `tez://upi/pay?pa=${upiID}&am=${amount}&cu=${currency}`;

    console.log("UPI URL: ", upiUrl); // Logs the generated UPI URL to the console for debugging.

    // Redirect to Google Pay using the custom intent
    window.location.href = upiUrl;

    // Assume payment was successful for demonstration purposes
    downloadReceiptButton.style.display = 'block';

    // Hide QR code container and adjust button margin
    qrCodeContainer.style.display = 'none';
    payViaAppButton.style.marginTop = '5px';
});

downloadReceiptButton.addEventListener('click', function () {
    const amount = document.getElementById('amount').value;
    const recipientName = document.getElementById('name').value;

    if (!amount || amount <= 0 || !recipientName) {
        alert('Please enter a valid amount and name.');
        return;
    }

    // Generate the PDF receipt using jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Museum Donation Receipt", 20, 20);
    doc.setFontSize(14);
    doc.text(`Recipient Name: ${recipientName}`, 20, 40);
    doc.text(`Amount Paid: ₹${amount}`, 20, 60);
    doc.text(`Transaction ID: ${new Date().getTime()}`, 20, 80); // Example transaction ID (timestamp)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);

    // Save the generated PDF
    doc.save(`Receipt_${recipientName}_${new Date().getTime()}.pdf`);
});
