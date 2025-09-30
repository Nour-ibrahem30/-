// عرض بيانات ملف شخصي بناءً على id في الرابط
fetch('../data/experts.json')
    .then(res => res.json())
    .then(data => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const container = document.querySelector('.active-profile .container');
        if (!id || !container) {
            if (container) container.innerHTML = '<div class="alert alert-danger mt-5">لم يتم العثور على بيانات الشخص.</div>';
            return;
        }
        const expert = data.experts.find(e => String(e.id) === id);
        if (!expert) {
            const profileDiv = document.getElementById('profile-data');
            if (profileDiv) profileDiv.innerHTML = '<div class="alert alert-danger mt-5">لم يتم العثور على بيانات الشخص.</div>';
            return;
        }
        // ضع بيانات الشخص فقط داخل div جديد
        const profileDiv = document.getElementById('profile-data');
        if (profileDiv) {
            profileDiv.classList.add('profile-data');
            profileDiv.innerHTML = `
        <div class="profile-top d-flex align-items-center mb-3 justify-content-space-evenly position-relative">
        <img src="${expert.image}" alt="${expert.alt}">
            <div class = "text position-absolute">
            <h2>${expert.name}</h2>
          <h4>${expert.title}</h4>
          </div>
          </div>
          <p><strong>الخبرة:</strong> ${expert.experience}</p>
          <p><strong>الوصف:</strong> ${expert.description}</p>
        `;
        }
    });
