function createAndStyleElement(tag, className, content=''){
    const element=document.createElement(tag);
    if (className) element.className=className;
    if (content) element.innerHTML=content;

    return element;
}

function setupCounter(element){
    let counter = 0;
    const setCounter = (count) => {
        counter = count;
        element.innerHTML = `<button>${counter}</button>`;
    };
    element.addEventListener('click', () => setCounter(counter +1));
    setCounter(0);
}


function createPage() {
    // Creation des elements
const app = document.getElementById('app');
const nav = createAndStyleElement('nav');
const homeLink=createAndStyleElement('a','','Home');
const aProposLink=createAndStyleElement('a','','À propos');
const produitsLink=createAndStyleElement('a','','Produits');
const networksButton=createAndStyleElement('a','','Réseaux');
// ajout des boutons a la navbar

networksButton.addEventListener('click', (event) =>{
    event.stopPropagation();
    subMenu.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
        subMenu.classList.remove('active');
    }
});

nav.appendChild(homeLink);
nav.appendChild(aProposLink);
nav.appendChild(produitsLink);
nav.appendChild(networksButton);

const subMenu = createAndStyleElement('div', 'sub-menu',`
    <a href="https://twitter.com" target="_blank">Twitter</a>
    <a href="https://facebook.com" target="_blank">Facebook</a>
    <a href="https://linkedin.com" target="_blank">LinkedIn</a>
`);
nav.appendChild(subMenu);

// creation des contenair de sections
const mainContent=createAndStyleElement('div','main-content','');
// creation des sections
const homeSection=createAndStyleElement('div', 'section active',`
    <h2>Bienvenue sur Javascript DOM</h2>
    <p>Cliquez sur le compteur</p>
    <div id="counter" class="counter">Compteur</div>
`)

const aProposSection=createAndStyleElement('div', 'section data-container','')

const produitsSection=createAndStyleElement('div', 'section',`
    <p>Produits</p>
    `)

const contactSection=createAndStyleElement('div', 'section',`
    <p>Contact</p>
    `)
// ajout des sections au contenair
    mainContent.appendChild(homeSection);
    mainContent.appendChild(aProposSection);
    mainContent.appendChild(produitsSection);
    mainContent.appendChild(contactSection);
// creation footer
const footer=createAndStyleElement('footer','footer',`
    <p class="footer">&copy; 2025 Javascript DOM, Tous droits réservés.</p>
    <p>
        <a href="https://twitter.com" target="_blank">Twitter</a>
        <a href="https://twitter.com" target="_blank">Twitter</a>
        <a href="https://twitter.com" target="_blank">Twitter</a>
    </p>
    `)

// ajout de la navbar a l'application
// ajout du contenair a l'appli
// ajout du footer a l'appli
app.appendChild(nav);
app.appendChild(mainContent);
app.appendChild(footer);

// ecouter le click du bouton home
homeLink.addEventListener('click', ()=>{
    // j'affiche la section home dans le contenair
    showSection(homeSection);
    closeSubMenu();
});

aProposLink.addEventListener('click', ()=>{
    showSection(aProposSection);
    fetchData();
    closeSubMenu()
});

produitsLink.addEventListener('click', ()=>{
    showSection(produitsSection);
    closeSubMenu()
});



const counterElement = document.getElementById('counter');
setupCounter(counterElement);

// afficher une section
function showSection(section){
    // selectionner toutes les sections       | pour chaque section enleve la classe active
    document.querySelectorAll('.section').forEach(sec=> sec.classList.remove('active'));
    // pour la section cliquée ajoute lui la classe active
    section.classList.add('active');
}

function closeSubMenu() {
    const subMenu = document.querySelector('.sub-menu');
    if (subMenu.classList.contains('active')) {
        subMenu.classList.remove('active');
    }
}

}

async function fetchData(){
    const aProposSection = document.querySelector('.data-container');
    aProposSection.innerHTML = '';

    const loadingElement = createAndStyleElement ('div', 'loading', 'Loading...');
    aProposSection.appendChild(loadingElement);

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        setTimeout(() => {
            aProposSection.removeChild(loadingElement);

            data.slice(0,5).forEach(item => {
                const dataTitle = createAndStyleElement('h2','', item.title);
                const dataBody = createAndStyleElement('p', '', item.body);

                aProposSection.appendChild(dataTitle);
                aProposSection.appendChild(dataBody);
            })
        }, 1000);
    } catch (error) {
        aProposSection.removeChild(loadingElement);
        aProposSection.textContent = 'Une erreur est survenue';
    } 
}






createPage()




