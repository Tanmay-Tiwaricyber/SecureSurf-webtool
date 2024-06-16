document.getElementById('checkForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Checking...';

    try {
        const response = await fetch('/check-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        if (data.isPhishing) {
            resultDiv.textContent = 'Ruk ga bey!, Marna hai kya';
            resultDiv.style.color = 'red';
        } else {
            resultDiv.textContent = 'Thank Rakh aur visit kr Url Safe hai.';
            resultDiv.style.color = 'green';
        }
    } catch (error) {
        resultDiv.textContent = 'Tu jaa re , tumse na ho payega';
        resultDiv.style.color = 'red';
    }
});

