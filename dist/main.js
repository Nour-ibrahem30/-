class ExpertSystem {
    constructor() {
        this.expertsData = null;
        this.expertsContainer = null;
        this.initializeElements();
        this.setupEventListeners();
        this.createLoadingOverlay();
        this.setupSmoothScrolling();
        this.loadExperts();
    }
    initializeElements() {
        this.filters = {
            searchInput: document.getElementById('search'),
            specializationFilter: document.getElementById('general-specialization'),
            experienceFilter: document.getElementById('experience'),
            detailedSpecializationFilter: document.getElementById('detailed-specialization'),
            genderFilter: document.getElementById('gender')
        };
        this.expertsContainer = document.querySelector('.experts-box');
        this.expertCards = document.querySelectorAll('.expert');
    }
    setupEventListeners() {
        this.filters.searchInput.addEventListener('input', () => this.filterExperts());
        this.filters.specializationFilter.addEventListener('change', () => this.filterExperts());
        this.filters.experienceFilter.addEventListener('change', () => this.filterExperts());
        this.filters.detailedSpecializationFilter.addEventListener('change', () => this.filterExperts());
        this.filters.genderFilter.addEventListener('change', () => this.filterExperts());
        window.clearFilters = () => this.clearAllFilters();
    }
    createLoadingOverlay() {
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.id = 'loading-overlay';
        this.loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        this.loadingOverlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">جاري التحميل...</span>
                </div>
                <p class="mt-3 text-white">جاري التحميل...</p>
            </div>
        `;
        document.body.appendChild(this.loadingOverlay);
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loadingOverlay.style.opacity = '0';
                this.loadingOverlay.style.visibility = 'hidden';
            }, 1000);
        });
    }
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    async loadExperts() {
        try {
            const response = await fetch('../data/experts.json');
            const data = await response.json();
            this.expertsData = data.experts;
            if (this.expertsContainer) {
                this.renderExperts();
            }
        }
        catch (error) {
            console.error('Error loading experts data:', error);
            this.renderFallbackExperts();
        }
    }
    renderExperts() {
        if (!this.expertsData || !this.expertsContainer)
            return;
        this.expertsContainer.innerHTML = '';
        this.expertsData.forEach(expert => {
            const expertCard = this.createExpertCard(expert);
            this.expertsContainer.appendChild(expertCard);
        });
        this.expertCards = document.querySelectorAll('.expert');
    }
    createExpertCard(expert) {
        const card = document.createElement('div');
        card.className = 'expert';
        card.setAttribute('data-specialization', expert.specialization);
        card.setAttribute('data-experience', expert.experienceLevel);
        card.setAttribute('data-detailed-specialization', expert.detailedSpecialization);
        card.setAttribute('data-gender', expert.gender);
        card.setAttribute('data-service', expert.service);
        card.setAttribute('data-communication', expert.communication);
        card.innerHTML = `
            <img src="${expert.image}" alt="${expert.alt}" loading="lazy" decoding="async">
            <h3>${expert.name}</h3>
            <p>${expert.title}</p>
            <div class="exparenisis">
                <span>خبرة</span>
                <span>${expert.experience}</span>
            </div>
            <button class="btn btn-primary book-session">احجز جلسة</button>
            <button class="btn btn-primary"><a href="./portflio.html"> عرض الملف الشخصي</a></button>
        `;
        const bookButton = card.querySelector('.book-session');
        if (bookButton) {
            bookButton.addEventListener('click', () => {
                window.location.href = './Experts.html';
            });
        }
        return card;
    }
    renderFallbackExperts() {
        if (this.expertsContainer) {
            this.expertsContainer.innerHTML = `
                <div class="expert" data-specialization="family-counseling" data-experience="11-15" data-detailed-specialization="family-therapy" data-gender="female" data-service="individual" data-communication="both">
                    <img src="../imges/cotsh-amira.jpg" alt="Cotsh Amira" loading="lazy" decoding="async">
                    <h3>د. أميرة حسين</h3>
                    <p>اخصائي أُسري, مؤسس أُسرة</p>
                    <div class="exparenisis">
                        <span>خبرة</span>
                        <span>15 سنوات</span>
                    </div>
                    <button class="btn btn-primary book-session">احجز جلسة</button>
                    <button class="btn btn-primary"><a href="#"> عرض الملف الشخصي</a></button>
                </div>
                <div class="expert" data-specialization="family-counseling" data-experience="6-10" data-detailed-specialization="marriage-counseling" data-gender="female" data-service="family" data-communication="in-person">
                    <img src="../imges/cotash marim sameir.png" alt="Cotsh Marim Sameir" loading="lazy" decoding="async">
                    <h3>د. فاطمة علي</h3>
                    <p>استشارية أسرية</p>
                    <div class="exparenisis">
                        <span>خبرة</span>
                        <span>10 سنوات</span>
                    </div>
                    <button class="btn btn-primary book-session">احجز جلسة</button>
                    <button class="btn btn-primary"><a href="#"> عرض الملف الشخصي</a></button>
                </div>
                <div class="expert" data-specialization="psychology" data-experience="3-5" data-detailed-specialization="family-therapy" data-gender="female" data-service="group" data-communication="online">
                    <img src="../imges/cotash marim sameir.png" alt="Cotsh Mohanad" loading="lazy" decoding="async">
                    <h3>د. مريم سمير</h3>
                    <p> اخصائي اجتماعي,</p>
                    <div class="exparenisis">
                        <span>خبرة</span>
                        <span>7 سنوات</span>
                    </div>
                    <button class="btn btn-primary book-session">احجز جلسة</button>
                    <button class="btn btn-primary"><a href="#"> عرض الملف الشخصي</a></button>
                </div>
                <div class="expert" data-specialization="personal-development" data-experience="20+" data-detailed-specialization="life-coaching" data-gender="male" data-service="individual" data-communication="both">
                    <img src="../imges/Dr Mohmed Harby.jpg" alt="Dr Mohmed Harby" loading="lazy" decoding="async">
                    <h3>د. محمد حربي</h3>
                    <p>كوتش شباب, مؤسس قدرات</p>
                    <div class="exparenisis">
                        <span>خبرة</span>
                        <span>25 سنوات</span>
                    </div>
                    <button class="btn btn-primary book-session">احجز جلسة</button>
                    <button class="btn btn-primary"><a href="#"> عرض الملف الشخصي</a></button>
                </div>
                <div class="expert" data-specialization="family-counseling" data-experience="1-2" data-detailed-specialization="parenting" data-gender="female" data-service="family" data-communication="in-person">
                    <img src="../imges/omnia Mohamed.png" alt="Omnia Mohamed" loading="lazy" decoding="async">
                    <h3>د. أمنية محمد</h3>
                    <p>استشاري اسري</p>
                    <div class="exparenisis">
                        <span>خبرة</span>
                        <span>3 سنوات</span>
                    </div>
                    <button class="btn btn-primary book-session">احجز جلسة</button>
                    <button class="btn btn-primary"><a href="#"> عرض الملف الشخصي</a></button>
                </div>
            `;
            this.expertCards = document.querySelectorAll('.expert');
            document.querySelectorAll('.expert .book-session').forEach(btn => {
                btn.addEventListener('click', () => {
                    window.location.href = './Experts.html';
                });
            });
        }
    }
    filterExperts() {
        const searchTerm = this.filters.searchInput.value.toLowerCase();
        const selectedSpecialization = this.filters.specializationFilter.value;
        const selectedExperience = this.filters.experienceFilter.value;
        const selectedDetailedSpecialization = this.filters.detailedSpecializationFilter.value;
        const selectedGender = this.filters.genderFilter.value;
        let visibleCardsCount = 0;
        this.expertCards.forEach(card => {
            let showCard = true;
            if (searchTerm) {
                const expertName = card.querySelector('h3').textContent.toLowerCase();
                const expertSpecialization = card.querySelector('p').textContent.toLowerCase();
                if (!expertName.includes(searchTerm) && !expertSpecialization.includes(searchTerm)) {
                    showCard = false;
                }
            }
            if (selectedSpecialization && showCard) {
                const cardSpecialization = card.dataset.specialization;
                if (cardSpecialization !== selectedSpecialization) {
                    showCard = false;
                }
            }
            if (selectedExperience && showCard) {
                const cardExperience = card.dataset.experience;
                if (cardExperience !== selectedExperience) {
                    showCard = false;
                }
            }
            if (selectedDetailedSpecialization && showCard) {
                const cardDetailedSpecialization = card.dataset.detailedSpecialization;
                if (cardDetailedSpecialization !== selectedDetailedSpecialization) {
                    showCard = false;
                }
            }
            if (selectedGender && showCard) {
                const cardGender = card.dataset.gender;
                const cardService = card.dataset.service;
                const cardCommunication = card.dataset.communication;
                if (selectedGender !== cardGender &&
                    selectedGender !== cardService &&
                    selectedGender !== cardCommunication) {
                    showCard = false;
                }
            }
            this.animateCard(card, showCard);
            if (showCard) {
                visibleCardsCount++;
            }
        });
        this.handleNoResults(visibleCardsCount);
    }
    animateCard(card, showCard) {
        if (showCard) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        }
        else {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    }
    handleNoResults(visibleCardsCount) {
        let noResultsMessage = document.getElementById('no-results');
        if (visibleCardsCount === 0) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'no-results';
                noResultsMessage.className = 'no-results text-center py-5';
                noResultsMessage.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                        <h3 class="text-muted">لم يتم العثور على نتائج</h3>
                        <p class="text-muted">جرب تغيير معايير البحث أو الفلترة</p>
                        <button class="btn btn-outline-primary mt-3" onclick="clearFilters()">
                            مسح جميع الفلاتر
                        </button>
                    </div>
                `;
                this.expertsContainer.appendChild(noResultsMessage);
            }
        }
        else {
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
        }
    }
    clearAllFilters() {
        this.filters.searchInput.value = '';
        this.filters.specializationFilter.value = '';
        this.filters.experienceFilter.value = '';
        this.filters.detailedSpecializationFilter.value = '';
        this.filters.genderFilter.value = '';
        this.filterExperts();
    }
    addExpert(expertData) {
        if (this.expertsData && this.expertsContainer) {
            this.expertsData.push(expertData);
            const expertCard = this.createExpertCard(expertData);
            this.expertsContainer.appendChild(expertCard);
            this.expertCards = document.querySelectorAll('.expert');
        }
    }
    filterExpertsByCriteria(criteria) {
        if (!this.expertsData)
            return [];
        return this.expertsData.filter(expert => {
            return Object.keys(criteria).every(key => {
                const expertKey = key;
                if (!criteria[expertKey])
                    return true;
                return expert[expertKey] === criteria[expertKey];
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ExpertSystem();
});
export default ExpertSystem;
window.onload = function () {
    const image = document.querySelector('.logo');
    setTimeout(() => {
        if (image) {
            image.className = `image-loaded`;
        }
        document.body.style.opacity = '1';
    }, 3000);
    image?.classList.remove('image-loaded');
};
//# sourceMappingURL=main.js.map