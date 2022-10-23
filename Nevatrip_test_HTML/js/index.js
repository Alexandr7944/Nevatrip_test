const itemTimeBtn = document.querySelector('.item-time-btn');
const itemTime = itemTimeBtn.closest('.list-time').querySelectorAll('.item-time');
itemTimeBtn.addEventListener('click', () => {
    itemTime.forEach(item => item.style.display='block');
    itemTimeBtn.style.display='none';          
})