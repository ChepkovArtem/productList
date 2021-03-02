var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var itemsList = JSON.parse(this.responseText);
        let list = document.querySelector('.content__list')
        let itemHTML = ``;
        for (let i=0; i<itemsList.length; i++){
            itemHTML +=`<li class="content__item item">
                <h2 class = "item__title">${itemsList[i].title}</h2>
                <div class="change-title">Change</div>`
            if(itemsList[i].img){
                itemHTML +=`
                    <div class="item__photo"><img src="${itemsList[i].img}" alt=""></div>`
            }
            itemHTML +=`
                <span class="item__description"><span class="item__description-title">Описание:</span>&nbsp ${itemsList[i].description}</span>
                <span class="item__price"><p>Цена:</p>&nbsp<p>${itemsList[i].price}</p></span>`

            if(itemsList[i].characteristics) {
                itemHTML +=`<div class="item__characteristics">
                    <h3>Характеристики:</h3>`
                for (let j = 0; j < itemsList[i].characteristics.length; j++) {
                    itemHTML +=`
                    <span class="item__characteristic-info"><span class="item__characteristic-name">${itemsList[i].characteristics[j].name}:</span><span class="item__characteristic-value">${itemsList[i].characteristics[j].value}</span></span>
                    `
                }
                itemHTML +=`</div>`
            }
            itemHTML +=`</li>`

}
list.innerHTML = itemHTML;
    }
};
xmlhttp.open("GET", "./data.json", true);
xmlhttp.send();


setTimeout(function () {
    var titles = document.querySelectorAll('.item__title');
    for (let i=0;i<titles.length; i++){
        titles[i].addEventListener('click', function changeName(){
            var input =document.createElement('input');
            var oldValue = this.innerHTML;
            input.value = this.innerHTML;
            this.innerHTML = '';
            this.appendChild(input);
            this.nextElementSibling.style.display = "block";
            var title = this;

            title.nextElementSibling.addEventListener('click', function (){
                if(input.value){
                    title.innerHTML = input.value;
                    title.addEventListener('click', changeName);
                    title.nextElementSibling.style.display = "none";
                } else
                    title.innerHTML = oldValue;
                title.addEventListener('click', changeName);
                title.nextElementSibling.style.display = "none";

            })


            this.removeEventListener('click', changeName);
        });
    }},100
)

setTimeout(function () {
    const itemList = document.querySelector('.content__list');
    const items = itemList.querySelectorAll('.item');

    for (const item of items) {
        item.draggable = true;
    }

    itemList.addEventListener('dragstart', (evt) => {
        evt.target.classList.add('selected');
    });

    itemList.addEventListener('dragend', (evt) => {
        evt.target.classList.remove('selected');
    });

    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenterX = currentElementCoord.x - currentElementCoord.width;
        //const currentElementCenterY = currentElementCoord.y + currentElementCoord.height / 2;

        const nextElement = (cursorPosition < currentElementCenterX) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;
    };

    itemList.addEventListener('dragover', (evt) => {
        evt.preventDefault();

        const activeElement = itemList.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains('item');

        if (!isMoveable) {
            return;
        }
        const nextElement = getNextElement(evt.clientX, currentElement)
        //const nextElement = getNextElement(evt.clientY, currentElement);

        if (
            nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;
        }

        itemList.insertBefore(activeElement, nextElement);
    });
},100)


var needArrow = document.querySelectorAll('.menu__item, .sub-menu__item');
for(let i=0; i<needArrow.length; i++){
    if(needArrow[i].childNodes.length>3){
        var arrow = document.createElement("span");
        arrow.classList.add('arrow');
        needArrow[i].classList.add('hasChilds');
        if(needArrow[i].classList.contains('menu__item')){
            arrow.classList.add('menu__arrow');
        } else if(needArrow[i].classList.contains('sub-menu__item')){
            arrow.classList.add('sub-menu__arrow');
        }
        var link = needArrow[i].querySelector('ul');
        needArrow[i].insertBefore(arrow, link);
    }
}


let isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
let body=document.querySelector('body');
if(isMobile.any()){
    body.classList.add('touch');
    let arrow=document.querySelectorAll('.arrow');
    for(i=0; i<arrow.length; i++){
        let thisLink=arrow[i].previousElementSibling;
        let subMenu=arrow[i].nextElementSibling;
        let thisArrow=arrow[i];

        thisLink.classList.add('parent');
        arrow[i].addEventListener('click', function(){
            subMenu.classList.toggle('open');
            thisArrow.classList.toggle('active');
        });
    }
}else{
    body.classList.add('mouse');
}