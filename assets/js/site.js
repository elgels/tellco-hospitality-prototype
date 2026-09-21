const toggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const closeNav = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); };
toggle?.addEventListener('click', () => {
 const open = toggle.getAttribute('aria-expanded') !== 'true';
 toggle.setAttribute('aria-expanded', String(open));
 nav.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
 if(event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {closeNav();toggle.focus();}
});
nav?.addEventListener('click', event => {if(event.target.closest('a'))closeNav();});
const header=document.querySelector('[data-header]');
const updateHeader=()=>header?.classList.toggle('is-scrolled',window.scrollY>12);
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
