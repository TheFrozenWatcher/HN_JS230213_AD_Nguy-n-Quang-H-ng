const cards = [];

// Mặc định chọn thẻ đầu tiên
const mastercardElement = document.getElementById("mastercard-img");

if (mastercardElement) {
    mastercardElement.classList.add("selected");
}

// Chọn thẻ
function selectCard(cardId) {
    // Bỏ chọn các thẻ trước đó
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('selected');
    });

    // Chọn thẻ mới nhấn vào
    const selectedCard = document.getElementById(cardId);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

// Validate dữ liệu đầu vào
window.validateAndSubmit = function () {
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const CVV = document.getElementById("CVV").value;

    // Validate mã số thẻ
    const cardNumberValidation = document.getElementById("cardNumberValidation");
    if (cardNumberValidation) {
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            cardNumberValidation.textContent = "Mã số thẻ phải là 16 chữ số.";
            return;
        } else {
            cardNumberValidation.textContent = "";
        }
    } else {
        console.error("Mã số thẻ không hợp lệ.");
    }

    // Validate ngày hết hạn
    const expiryDateValidation = document.getElementById("expiry-date");
    if (!expiryDate.match(/^\d{4}-\d{2}$/)) {
        alert("Ngày hết hạn phải theo định dạng tháng/năm");
        return;
    } else {
        expiryDateValidation.textContent = "";
    }

    // Validate CVV
    const CVVValidation = document.getElementById("CVV");
    if (CVV.length !== 3 || isNaN(CVV)) {
        alert("CVV phải gồm 3 ký tự");
        return;
    } else {
        CVVValidation.textContent = "";
    }

    const selectedCard = document.querySelector(".card .img");

    // Nếu dữ liệu đã được hợp lý hóa, tải lên hệ thống và thông báo cho người dùng
    const cardData = {
        cardImage: selectedCard.id,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        CVV: CVV,
    };

    //Tạo function lưu dữ liệu vào local storage
    function saveToLocalStorage(data) {
        // Lấy danh sách thẻ từ local storage
        const cards = JSON.parse(localStorage.getItem("cards")) || [];

        // Thêm thẻ mới
        cards.push(data);

        // Lưu danh sách thẻ vào local storage
        localStorage.setItem("cards", JSON.stringify(cards));

        // Hiển thị danh sách thẻ trên trang admin
    }

    // Lưu vào local storage
    saveToLocalStorage(cardData);
    alert("Dữ liệu đã gửi thành công!");
};

// Hiển thị lên trang admin
document.addEventListener("DOMContentLoaded", function () {
    function displayCardsOnAdminPage() {
        const tbody = document.getElementById("tbody");

        if (!tbody) {
            console.error("Element with ID 'tbody' not found.");
            return;
        }
        tbody.innerHTML = "";

        // Lấy danh sách thẻ từ local storage
        const cards = JSON.parse(localStorage.getItem("cards")) || [];

        // Hiển thị mỗi thẻ trong bảng
        cards.forEach((card, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td><img src="./asset/${card.cardImage}-og-image.png" alt="Card Image" style="width: 50px;"></td>
            <td>${maskCardNumber(card.cardNumber)}</td>
            <td>${card.expiryDate}</td>
            <td>${maskCVV(card.CVV)}</td>
            <td>
                <button class="btn-admin" onclick="viewCard(${index})">View</button>
                <button class="btn-admin" onclick="editCard(${index})">Edit</button>
                <button class="btn-admin" onclick="deleteCard(${index})">Delete</button>
            </td>
          `;
            tbody.appendChild(row);
        });
    }

    function maskCardNumber(cardNumber) {
        // Ẩn 6 chữ số từ số thứ 7
        const maskedDigits = "******";

        // Combine the masked portion with the first six and last four digits
        return cardNumber.slice(0, 6) + maskedDigits + cardNumber.slice(12);
    }

    function maskCVV(CVV) {
        //Ẩn CVV
        return "***";
    }

    displayCardsOnAdminPage();
});

function displayCardDetails(index) {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const selectedCard = cards[index];

    const cardDetailsContent = document.getElementById("cardDetailsContent");
    cardDetailsContent.innerHTML = `
        <p><strong>Card Image:</strong> ${selectedCard.cardImage}</p>
        <p><strong>Card Number:</strong> ${maskCardNumber(selectedCard.cardNumber)}</p>
        <p><strong>Expiry Date:</strong> ${selectedCard.expiryDate}</p>
        <p><strong>CVV:</strong> ${maskCVV(selectedCard.CVV)}</p>
    `;

    const cardDetailsSection = document.getElementById("cardDetails");
    cardDetailsSection.style.display = "block";
}

function closeCardDetails() {
    const cardDetailsSection = document.getElementById("cardDetails");
    cardDetailsSection.style.display = "none";
}

function editCard(index) {
    alert("Edit card: " + index);
}

function deleteCard(index) {
    alert("Delete card: " + index);
}
function viewCard(index) {
    displayCardDetails(index);
}

function editCard(index) {
    alert("Edit card: " + index);
}

function deleteCard(index) {
    alert("Delete card: " + index);
}