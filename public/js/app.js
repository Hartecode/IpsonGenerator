'use strict;'

console.log('connected');
const formFeild = document.getElementById('formFiled');
const numOfParagraphInput = document.getElementById('par');
const textArea = document.querySelector('.text');
console.log(textArea)


formFeild.addEventListener("submit", getIpsumCall);

function getIpsumCall(e) {
    e.preventDefault();
    const inputParValue = numOfParagraphInput.value;
    console.log('clciked', inputParValue)
    axios.get(`/api/?par=${inputParValue}`)
        .then(res => {
            textArea.classList.remove('hide');
            textArea.innerHTML = res.data.ipsum;
        })
        .catch(e => {
            console.log('error', e);
            textArea.classList.remove('hide');
            textArea.innerHTML = `<p class="requestIssue">Sorry we are having Panda problems.</p>`;
        });
}