// Classes needed from HTML.
const DOMStrings = {
    navAndCTA: document.querySelector('.nav-and-cta'),
    navDefault: document.querySelector('.nav-default'),
    headerNav: document.querySelector('.list-group'),
    hamburgerMenu: document.querySelector('.hamburger-menu__link'),
    headerOverlay: document.querySelector('.header__overlay'),
    footerLinks: document.querySelector('.footer__links'),
    requestInviteCTA: document.querySelectorAll('.request-invite-cta')
}

// Some dummy data created as object literals.
const setup = {
    navMenu: [
        { id: '256oeiku', menuName: 'Home', link: '#', inHeader: true, inFooter: false }, 
        { id: '362mkihy', menuName: 'About', link: '#', inHeader: true, inFooter: true },
        { id: '124oeigj', menuName: 'Contact', link: '#', inHeader: true, inFooter: true },
        { id: '362mkihy', menuName: 'Blog', link: '#', inHeader: true, inFooter: true },
        { id: '124oeigj', menuName: 'Careers', link: '#', inHeader: true, inFooter: true },
        { id: '214ielmn', menuName: 'Support', link: '#', inHeader: false, inFooter: true },
        { id: '567ghfyw', menuName: 'Privacy Policy', link: '#', inHeader: false, inFooter: true }     
    ],
    cta: [ 
        { id: '254pmlnb', ctaName: 'Request Invite', link: '#' },
        { id: '177ioiiu', ctaName: 'Test CTA', link: '#' }
    ],
    breakPointWidth: 780
}

// Getting property and value from setup object literal (navMenu and cta)
// which is received as data.
class Data {
    static getData() {
        let navMenu = setup.navMenu
        let cta = setup.cta
        return { navMenu, cta }
    }
}

// Front-end HTML.
class UI {
    // Navigation links
    static displayLinkMenu(data) {
        let navMenu = ''
        let subMenu = ''
        let footerMenu = ''
        // Looping through data.navMenu to display navigation links which are
        // presented by elements:
        // 1 <nav> 'nav-default'
        // 2 <nav> 'nav-default-as-submenu'
        // 3 <div> 'footer__links'
        for (let i = 0; i < data.navMenu.length; i++) {
            // If data.navMenu[i].inHeader is true, it means it'll show in:
            // 1 <nav> 'nav-default'
            // 2 <nav> 'nav-default-as-submenu'
            if (data.navMenu[i].inHeader == true) {
                navMenu += `
                <li class="list-group-items ${data.navMenu[i].id}"><a class="list-group-links" href="${data.navMenu[i].link}">${data.navMenu[i].menuName}</a></li>
                `
            }
            // If data.navMenu[i].inFooter is true, it means it'll show in <div> 'footer__links'.
            if (data.navMenu[i].inFooter == true) {
                footerMenu += `
                <a href="${data.navMenu[i].link}" class="footer__links-item">${data.navMenu[i].menuName}</a>
                `
            }                      
        }
        DOMStrings.headerNav.innerHTML = navMenu
        DOMStrings.footerLinks.innerHTML = footerMenu
        DOMStrings.headerNav.children[0].classList.add('list-group-items--active')
    }

    // CTAs
    static displayCTA(data, ctaDOM, ctaName) {  
        let neededCTA = ''  
        // Looping through data.cta to display the required cta. This depends on 3
        // items: data, ctaDOM, ctaName, where ctaDOM is the HTML element that'll hold
        // the created <div> 'button__cta'. In this case, there's only 1 ctaDOM,
        // <div> 'request-invite-cta'.
        for (let i = 0; i < data.cta.length; i++) {
            if (data.cta[i].ctaName == ctaName) {
                for (let j = 0; j < ctaDOM.length; j++) {
                    neededCTA = `
                    <div class="button__cta">
                        <a href="${data.cta[i].link}" class="button__cta--primary">${data.cta[i].ctaName}</a>
                    </div>
                    `
                    ctaDOM[j].innerHTML = neededCTA    
                }
            }
        }        
    }

    // Show & hide headerOverlay & submenuGroup.
    static toggleClasses() {
        DOMStrings.headerOverlay.classList.toggle('header__overlay-show')
        DOMStrings.navAndCTA.classList.toggle('nav-and-cta-as-dropdown-show')
    }
    // Adding or Removing classes depending on 3 parameters received:
    // 1 DOMElement, which can be an array of properties from DOMStrings object.
    // 2 className, which can be an array of class names.
    // 3 action, which can be 'add' or 'remove'.
    static addOrRemovedClass(DOMElement, className, action) {
        for (let i = 0; i < className.length; i++) {
            if (action == 'add') { DOMElement[i].classList.add(className[i]) } 
            else if (action == 'remove') { DOMElement[i].classList.remove(className[i]) }
        }
    }
    // Getting the browser's width 'browserWidth' when the browser is resized horizontally 'window.innerWidth'.
    // If (browserWidth <= setup.breakPointWidth) is 'true' or 'false' some classes are added & removed then 
    // 'DOMStrings.hamburgerMenu' is checked wether is has a class 'hamburger-menu__link-clicked' then some 
    // classes are added ore removed.
    static checkBrowserWidth() {        
        const browserWidth = window.innerWidth
        if (browserWidth <= setup.breakPointWidth) {            
            this.addOrRemovedClass(
                [DOMStrings.navAndCTA, DOMStrings.navDefault],
                ['nav-and-cta', 'nav-default'],
                'remove'
            )
            this.addOrRemovedClass(
                [DOMStrings.navAndCTA, DOMStrings.navDefault],
                ['nav-and-cta-as-dropdown', 'nav-default-as-dropdown'],
                'add'
            )
            if (DOMStrings.hamburgerMenu.classList.contains('hamburger-menu__link-clicked')) {
                this.addOrRemovedClass(
                    [DOMStrings.headerOverlay, DOMStrings.navAndCTA],
                    ['header__overlay-show', 'nav-and-cta-as-dropdown-show'],
                    'add'
                )
            } 
        } else {
            this.addOrRemovedClass(
                [DOMStrings.navAndCTA, DOMStrings.navDefault],
                ['nav-and-cta', 'nav-default'],
                'add'
            )
            this.addOrRemovedClass(
                [DOMStrings.navAndCTA, DOMStrings.navDefault, DOMStrings.navAndCTA],
                ['nav-and-cta-as-dropdown', 'nav-default-as-dropdown', 'nav-and-cta-as-dropdown-show'],
                'remove'
            )
            if (DOMStrings.hamburgerMenu.classList.contains('hamburger-menu__link-clicked')) {
                this.addOrRemovedClass(
                    [DOMStrings.headerOverlay, DOMStrings.navAndCTA],
                    ['header__overlay-show', 'nav-and-cta-as-dropdown-show'],
                    'remove'
                )
            }  
        }             
    }
}

// By clicking the <a> with class 'hamburger-menu__link' which has 3 <span> elements,
// there are 2 elements shown:
// 1 <div> class 'header__overlay'
// 2 <nav> class 'nav-default-as-submenu'
// By clicking it again, they are hidden.
DOMStrings.hamburgerMenu.addEventListener('click', function() {
    DOMStrings.hamburgerMenu.classList.toggle('hamburger-menu__link-clicked')
    UI.toggleClasses()
})

// Window resize to detect width of the browser where if it is greater
// than setup.breakPointWidth, 2 elements are hidden
// 1 <div> with classes 'mobilemenu-group'
// 2 'header__overlay'
// Then <a> 'hamburger-menu__link' <span> goes back to it's original
// css rules.
window.addEventListener('resize', function() {
    UI.checkBrowserWidth()
})

// In page load, we get property and values from setup object literal, display
// navigation links in elements with classes:
// 1 'nav-default-as-submenu-ul'
// 2 'nav-default-as-submenu-ul'
// 3 'footer__links'
document.addEventListener('DOMContentLoaded', function() {
    let data = Data.getData() // Getting dummy data from setup object.
    UI.displayLinkMenu(data) // Displaying navigation menus to the front-end HTML.
    UI.displayCTA(data, DOMStrings.requestInviteCTA, 'Request Invite') // Creating a CTA.
    UI.checkBrowserWidth()
})

