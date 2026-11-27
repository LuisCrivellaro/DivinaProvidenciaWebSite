/**
 * Roda antes da primeira pintura: liga o modo de revelação só com JS e sem prefers-reduced-motion.
 * Se o RevealObserver não montar em 3 s (erro de hidratação, script bloqueado), desliga o modo
 * para que nenhum conteúdo fique escondido.
 */
export const revealBootScript = `(function(){try{var d=document.documentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(!('IntersectionObserver' in window))return;d.classList.add('js-reveal');setTimeout(function(){if(!d.dataset.revealReady)d.classList.remove('js-reveal')},3000)}catch(e){}})();`;
