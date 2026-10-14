"use strict";
document.addEventListener('DOMContentLoaded',()=>{
  const links=[...document.querySelectorAll('.rail__link')];
  const sections=[...document.querySelectorAll('.section[id]')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible) return;
      const id=visible.target.id;
      links.forEach(link=>{
        const active=link.getAttribute('href')==='#'+id;
        link.classList.toggle('active',active);
        if(active) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    },{rootMargin:'-10% 0px -55% 0px',threshold:[0,.1,.3]});
    sections.forEach(section=>observer.observe(section));
  }

  const lightbox=document.getElementById('image-dialog');
  if(lightbox){
    const img=lightbox.querySelector('img');
    document.querySelectorAll('button.shot__btn[data-full]').forEach(button=>button.addEventListener('click',()=>{
      const source=button.getAttribute('data-full');
      if(!source) return;
      img.src=source;
      if(typeof lightbox.showModal==='function') lightbox.showModal();
      else window.open(source,'_blank','noopener');
    }));
    lightbox.querySelector('.lightbox__close')?.addEventListener('click',()=>lightbox.close());
    lightbox.addEventListener('click',e=>{if(e.target===lightbox) lightbox.close();});
  }

  const phones=document.getElementById('video-list');
  document.querySelectorAll('.phones__nav').forEach(arrow=>arrow.addEventListener('click',()=>{
    if(!phones) return;
    const card=phones.querySelector('.phone');
    const amount=(card?.getBoundingClientRect().width||230)+19;
    phones.scrollBy({left:(parseInt(arrow.dataset.dir,10)||1)*amount,behavior:'smooth'});
  }));
});

document.querySelectorAll('.shot img').forEach(img=>{
  const onError=()=>{const figure=img.closest('.shot');if(!figure)return;
    const btn=img.closest('.shot__btn');if(btn)btn.style.display='none';
    if(!figure.querySelector('.asset-missing')){
      const p=document.createElement('p');p.className='asset-missing';p.textContent='Screenshot not available';p.style.display='block';figure.appendChild(p);
    }else{figure.querySelector('.asset-missing').style.display='block'}
  };
  img.addEventListener('error',onError);
  if(img.complete && img.naturalWidth===0)onError();
});
