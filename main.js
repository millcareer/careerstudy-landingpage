// キャリアスタディLP - メインJavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // スムーズスクロール設定
    initSmoothScroll();
    
    // スクロールアニメーション
    initScrollAnimations();
    
    // CTAボタンのトラッキング
    initCTATracking();
    
    // LINE登録ボタンの処理
    initLINEButtons();
    
    // フローティングCTAの表示制御
    initFloatingCTA();
    
});

// スムーズスクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offset = 80; // ヘッダーの高さ分のオフセット
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 要素ごとに異なるアニメーションを適用
                if (entry.target.classList.contains('anxiety-item')) {
                    animateAnxietyItems();
                } else if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCards();
                } else if (entry.target.classList.contains('story-card')) {
                    animateStoryCards();
                }
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    const animatedElements = document.querySelectorAll(
        '.section-title, .anxiety-item, .feature-card, .story-card, .reason-card'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// 不安要素のアニメーション
function animateAnxietyItems() {
    const items = document.querySelectorAll('.anxiety-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 100);
    });
}

// フィーチャーカードのアニメーション
function animateFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 100);
    });
}

// ストーリーカードのアニメーション
function animateStoryCards() {
    const cards = document.querySelectorAll('.story-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 150);
    });
}

// CTAボタンのトラッキング
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // アナリティクスイベントを送信（実際の実装時）
            console.log(`CTA clicked: Position ${index + 1}`);
            
            // 簡単なフィードバックアニメーション
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // LINE URLに遷移（実際のLINE URLに変更する必要があります）
            setTimeout(() => {
                window.location.href = 'https://lin.ee/6aEeWAd';
                showLineModal();
            }, 300);
        });
    });
}

// LINE登録モーダル（仮実装）
function showLineModal() {
    // モーダルを作成
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full animate-fade-in">
            <div class="text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fab fa-line text-4xl text-green-500"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">LINE登録画面へ</h3>
                <p class="text-gray-600 mb-6">
                    LINEアプリが開きます。<br>
                    友だち追加で就活対策を始めましょう！
                </p>
                <div class="space-y-3">
                    <button class="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition">
                        <i class="fab fa-line mr-2"></i>
                        LINEで登録する
                    </button>
                    <button onclick="closeModal(this)" class="w-full text-gray-500 hover:text-gray-700 transition">
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // モーダル外クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// モーダルを閉じる
function closeModal(element) {
    const modal = element.closest('.fixed');
    if (modal) {
        modal.remove();
    }
}

// LINE登録ボタンの初期化
function initLINEButtons() {
    const lineButtons = document.querySelectorAll('a[href="#"]');
    
    lineButtons.forEach(button => {
        if (button.textContent.includes('LINE')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // LINE URL
                window.location.href = 'https://lin.ee/6aEeWAd';
                showLineModal();
            });
        }
    });
}

// フローティングCTAの表示制御
function initFloatingCTA() {
    const floatingCTA = document.querySelector('.floating-cta');
    if (!floatingCTA) return;
    
    let lastScrollTop = 0;
    let isScrollingDown = false;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロール方向を判定
        isScrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop;
        
        // ヘッダーを過ぎたら表示
        if (scrollTop > 300) {
            floatingCTA.style.transform = 'translateY(0)';
            floatingCTA.style.opacity = '1';
        } else {
            floatingCTA.style.transform = 'translateY(100px)';
            floatingCTA.style.opacity = '0';
        }
        
        // フッター付近で非表示
        const footer = document.querySelector('footer');
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top;
            if (footerTop < window.innerHeight) {
                floatingCTA.style.transform = 'translateY(100px)';
                floatingCTA.style.opacity = '0';
            }
        }
    });
    
    // 初期状態を設定
    floatingCTA.style.transition = 'all 0.3s ease';
    floatingCTA.style.transform = 'translateY(100px)';
    floatingCTA.style.opacity = '0';
}

// パフォーマンス最適化：スクロールイベントのスロットリング
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// カウントアップアニメーション（数字を表示する場合）
function animateCount(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ページロード時のアニメーション
window.addEventListener('load', function() {
    // ヒーローセクションのアニメーション
    const heroElements = document.querySelectorAll('.hero-section > div > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// タッチデバイス用の最適化
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // タッチデバイスでのホバー効果を無効化
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .feature-card:hover,
        .touch-device .anxiety-item:hover,
        .touch-device .story-card:hover {
            transform: none;
        }
    `;
    document.head.appendChild(style);
}

// デバッグ用：コンソールにメッセージ
console.log('キャリアスタディLP - 正常に読み込まれました');
console.log('体育会系学生の就活を全力サポート！');
