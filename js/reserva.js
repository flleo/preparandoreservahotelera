/* Poppover Noches****************************/
var x, i, j, selElmnt, a, b, c;
/*TODO ESTO LO HACE SOLLO CUANDO SELECCIONAMOS ALGUNA OPCION:*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;

    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");

    for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    if (this.innerHTML != 'POPULAR DURATIONS' && this.innerHTML != 'DAILY')
                        h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}



/* Calendar *********************************/
var d = new Date()
document.getElementById('fecha').value = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()

jQuery(function($) {
    $.datepicker.regional['es'] = {
        dateFormat: 'dd/mm/yy'
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

$(function() {
    $("#fecha").datepicker();
});

/* Rooms & Guests****************************/

var dropdown, c = 1
var rgbtnAction = document.getElementById('rgbtn-action')

/* When the user clicks on the button, */
function myFunction() {
    dropdown = document.getElementById("rgdropdown-content")
    dropdown.classList.toggle("show");
}

function childrens(col) {


    let colcol = document.getElementsByClassName('col' + col)[0]
    var secc1 = colcol.firstElementChild
    var secc2 = secc1.nextElementSibling
    let select = secc1.lastElementChild.childNodes[3].childNodes[1]
    let value = select.value
    let option = select.querySelector(`option[value='${value}']`)
    let childs = option.innerText

    switch (childs) {
        case '0':
            secc2.setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[3].setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[5].setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[7].setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[9].setAttribute('style', 'visibility:collapse;');
            break
        case '1':
            secc2.setAttribute('style', 'visibility:visible;')
            secc2.childNodes[3].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[5].setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[7].setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[9].setAttribute('style', 'visibility:collapse;');
            break
        case '2':
            secc2.setAttribute('style', 'visibility:visible;')
            secc2.childNodes[3].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[5].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[7].setAttribute('style', 'visibility:collapse;');
            secc2.childNodes[9].setAttribute('style', 'visibility:collapse;');
            break
        case '3':
            secc2.setAttribute('style', 'visibility:visible;')
            secc2.childNodes[3].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[5].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[7].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[9].setAttribute('style', 'visibility:collapse;');
            break
        case '4':
            secc2.setAttribute('style', 'visibility:visible;')
            secc2.childNodes[3].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[5].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[7].setAttribute('style', 'visibility:visible;');
            secc2.childNodes[9].setAttribute('style', 'visibility:visible;');
            break
    }

}

function add() {
    let nodes = dropdown.childNodes

    if (nodes.length < 9) {
        c++
        var col1 = dropdown.firstElementChild
        var colc = col1.cloneNode(true)
        colc.setAttribute('class', 'col' + c + ' rooms')
        let secc1 = colc.firstElementChild
        let secc2 = secc1.nextElementSibling
        secc2.setAttribute('style', 'visibility:collapse;')
        let childss = secc2.getElementsByClassName('rg-edades')
        console.log(childss)
        Array.from(childss).forEach(e => {
            e.setAttribute('style', 'visibility:collapse;')
        });
        /*    let lrow1 = secc1.lastElementChild
            let select = lrow1.lastElementChild.firstElementChild*/
        let select = secc1.getElementsByClassName('s-children')[0]
        select.setAttribute('onclick', 'childrens(' + c + ')')
        let x = colc.firstElementChild.firstElementChild
        x.innerHTML = ''
        col1.parentNode.insertBefore(colc, col1);
    }

}

function remove() {
    var col1 = dropdown.firstElementChild
    let x = col1.firstElementChild.firstElementChild
    if (x.innerHTML === '') {
        col1.parentNode.removeChild(col1)
        c--;
    }

}

function resolver() {
    let rooms = document.getElementsByClassName('rooms').length
    let room = ((rooms > 1) ? ' Rooms' : ' Room')
    let guests = document.getElementsByClassName('s-adults')

    let invitados = 0
    Array.from(guests).forEach(e => {
        invitados += parseInt(e.value)
    });
    rgbtnAction.innerHTML = rooms + room + ' & ' + invitados + ' Guests'
}

function done() {
    resolver()
        // Cerrar
    if (!event.target.matches('.rg-btn-action')) {
        if (dropdown.classList.contains('show'))
            dropdown.classList.remove('show');
    }
}