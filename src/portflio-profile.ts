interface Expert {
    id: number;
    name: string;
    title: string;
    image: string;
    alt: string;
    bio: string;
}

interface ExpertsData {
    experts: Expert[];
}

fetch('../data/experts.json')
    .then((res: Response) => res.json())
    .then((data: ExpertsData) => {
        const params = new URLSearchParams(window.location.search);
        const id: string | null = params.get('id');
        const container = document.querySelector('.active-profile .container') as HTMLElement | null;

        if (!id || !container) {
            if (container) {
                container.innerHTML =
                    '<div class="alert alert-danger mt-5">لم يتم العثور على بيانات الشخص.</div>';
            }
            return;
        }

        const expert: Expert | undefined = data.experts.find(
            (e: Expert) => String(e.id) === id
        );

        if (!expert) {
            const profileDiv = document.getElementById('profile-data');
            if (profileDiv) {
                profileDiv.innerHTML =
                    '<div class="alert alert-danger mt-5">لم يتم العثور على بيانات الشخص.</div>';
            }
            return;
        }

        const profileDiv = document.getElementById('profile-data');
        if (profileDiv) {
            profileDiv.classList.add('profile-data');
            profileDiv.innerHTML = `
        <div class="parent-content d-flex align-items-center gap-4 position-relative justify-content-between">
          <div class="parent-content-two d-flex align-items-center gap-4">
            <div class="content">
              <div class="img">
                <img src="${expert.image}" alt="${expert.alt}">
              </div>
            </div>
            <div class="text-content">
              <h2 class="mb-2">${expert.name}</h2>
              <p>${expert.title}</p>
            </div>
          </div>
          <button class="btn btn-hero-one mt-3">
            <a href="https://wa.me/201040031584?text=أرغب%20في%20حجز%20جلسة%20مع%20${encodeURIComponent(
                expert.name
            )}" class="text-decoration-none" target="_blank">احجز جلسة</a>
          </button>
        </div>

        <div class="about-expert mt-4">
          <img src="${expert.image}" alt="${expert.alt}" class="img-about mb-5">
          <h3 class="mb-3">نبذة عن ${expert.name}</h3>
          <p>${expert.bio}</p>
        </div>
      `;
        }
    })
    .catch((error: unknown) => {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
    });
