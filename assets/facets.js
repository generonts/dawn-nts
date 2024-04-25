class FacetFiltersForm extends HTMLElement{constructor(){super(),this.onActiveFilterClick=this.onActiveFilterClick.bind(this),this.debouncedOnSubmit=debounce(e=>{this.onSubmitHandler(e)},800);this.querySelector("form").addEventListener("input",this.debouncedOnSubmit.bind(this));var e=this.querySelector("#FacetsWrapperDesktop");e&&e.addEventListener("keyup",onKeyUpEscape)}static setListeners(){window.addEventListener("popstate",e=>{e=e.state?e.state.searchParams:FacetFiltersForm.searchParamsInitial;e!==FacetFiltersForm.searchParamsPrev&&FacetFiltersForm.renderPage(e,null,!1)})}static toggleActiveFacets(t=!0){document.querySelectorAll(".js-facet-remove").forEach(e=>{e.classList.toggle("disabled",t)})}static renderPage(r,a,e=!0){FacetFiltersForm.searchParamsPrev=r;var t=FacetFiltersForm.getSections(),i=document.getElementById("ProductCount"),o=document.getElementById("ProductCountDesktop");document.querySelectorAll(".facets-container .loading__spinner, facet-filters-form .loading__spinner").forEach(e=>e.classList.remove("hidden")),document.getElementById("ProductGridContainer").querySelector(".collection").classList.add("loading"),i&&i.classList.add("loading"),o&&o.classList.add("loading"),t.forEach(e=>{const t=`${window.location.pathname}?section_id=${e.section}&`+r;e=e=>e.url===t;FacetFiltersForm.filterData.some(e)?FacetFiltersForm.renderSectionFromCache(e,a):FacetFiltersForm.renderSectionFromFetch(t,a)}),e&&FacetFiltersForm.updateURLHash(r)}static renderSectionFromFetch(t,r){fetch(t).then(e=>e.text()).then(e=>{FacetFiltersForm.filterData=[...FacetFiltersForm.filterData,{html:e,url:t}],FacetFiltersForm.renderFilters(e,r),FacetFiltersForm.renderProductGridContainer(e),FacetFiltersForm.renderProductCount(e),"function"==typeof initializeScrollAnimationTrigger&&initializeScrollAnimationTrigger(e.innerHTML)})}static renderSectionFromCache(e,t){e=FacetFiltersForm.filterData.find(e).html;FacetFiltersForm.renderFilters(e,t),FacetFiltersForm.renderProductGridContainer(e),FacetFiltersForm.renderProductCount(e),"function"==typeof initializeScrollAnimationTrigger&&initializeScrollAnimationTrigger(e.innerHTML)}static renderProductGridContainer(e){document.getElementById("ProductGridContainer").innerHTML=(new DOMParser).parseFromString(e,"text/html").getElementById("ProductGridContainer").innerHTML,document.getElementById("ProductGridContainer").querySelectorAll(".scroll-trigger").forEach(e=>{e.classList.add("scroll-trigger--cancel")})}static renderProductCount(e){var e=(new DOMParser).parseFromString(e,"text/html").getElementById("ProductCount").innerHTML,t=document.getElementById("ProductCount"),r=document.getElementById("ProductCountDesktop");t.innerHTML=e,t.classList.remove("loading"),r&&(r.innerHTML=e,r.classList.remove("loading")),document.querySelectorAll(".facets-container .loading__spinner, facet-filters-form .loading__spinner").forEach(e=>e.classList.add("hidden"))}static renderFilters(e,r){e=(new DOMParser).parseFromString(e,"text/html");const a=e.querySelectorAll("#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter");var t=document.querySelectorAll("#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter");Array.from(t).forEach(t=>{Array.from(a).some(({id:e})=>t.id===e)||t.remove()});const i=e=>{var t=r?r.target.closest(".js-filter"):void 0;return!!t&&e.id===t.id},o=Array.from(a).filter(e=>!i(e));var t=Array.from(a).find(i);o.forEach((e,t)=>{if(document.getElementById(e.id))document.getElementById(e.id).innerHTML=e.innerHTML;else{if(0<t){var{className:t,id:r}=o[t-1];if(e.className===t)return void document.getElementById(r).after(e)}e.parentElement&&document.querySelector(`#${e.parentElement.id} .js-filter`).before(e)}}),FacetFiltersForm.renderActiveFacets(e),FacetFiltersForm.renderAdditionalElements(e),t&&(e=r.target.closest(".js-filter").id)&&(FacetFiltersForm.renderCounts(t,r.target.closest(".js-filter")),FacetFiltersForm.renderMobileCounts(t,document.getElementById(e)),e=(t=document.getElementById(e)).classList.contains("mobile-facets__details")?".mobile-facets__close-button":".facets__summary",t=t.querySelector(e),e="text"===r.target.getAttribute("type"),t)&&!e&&t.focus()}static renderActiveFacets(r){[".active-facets-mobile",".active-facets-desktop"].forEach(e=>{var t=r.querySelector(e);t&&(document.querySelector(e).innerHTML=t.innerHTML)}),FacetFiltersForm.toggleActiveFacets(!1)}static renderAdditionalElements(t){[".mobile-facets__open",".mobile-facets__count",".sorting"].forEach(e=>{t.querySelector(e)&&(document.querySelector(e).innerHTML=t.querySelector(e).innerHTML)}),document.getElementById("FacetFiltersFormMobile").closest("menu-drawer").bindEvents()}static renderCounts(e,t){var r=t.querySelector(".facets__summary"),a=e.querySelector(".facets__summary"),r=(a&&r&&(r.outerHTML=a.outerHTML),t.querySelector(".facets__header")),a=e.querySelector(".facets__header"),r=(a&&r&&(r.outerHTML=a.outerHTML),t.querySelector(".facets-wrap")),a=e.querySelector(".facets-wrap");a&&r&&(Boolean(t.querySelector("show-more-button .label-show-more.hidden"))&&a.querySelectorAll(".facets__item.hidden").forEach(e=>e.classList.replace("hidden","show-more-item")),r.outerHTML=a.outerHTML)}static renderMobileCounts(e,t){t=t.querySelector(".mobile-facets__list"),e=e.querySelector(".mobile-facets__list");e&&t&&(t.outerHTML=e.outerHTML)}static updateURLHash(e){history.pushState({searchParams:e},"",""+window.location.pathname+(e&&"?".concat(e)))}static getSections(){return[{section:document.getElementById("product-grid").dataset.id}]}createSearchParams(e){e=new FormData(e);return new URLSearchParams(e).toString()}onSubmitForm(e,t){FacetFiltersForm.renderPage(e,t)}onSubmitHandler(e){e.preventDefault();var t=document.querySelectorAll("facet-filters-form form");if("mobile-facets__checkbox"==e.srcElement.className){var r=this.createSearchParams(e.target.closest("form"));this.onSubmitForm(r,e)}else{const a=[],i="FacetFiltersFormMobile"===e.target.closest("form").id;t.forEach(e=>{i?"FacetFiltersFormMobile"===e.id&&a.push(this.createSearchParams(e)):"FacetSortForm"!==e.id&&"FacetFiltersForm"!==e.id&&"FacetSortDrawerForm"!==e.id||a.push(this.createSearchParams(e))}),this.onSubmitForm(a.join("&"),e)}}onActiveFilterClick(e){e.preventDefault(),FacetFiltersForm.toggleActiveFacets();e=-1==e.currentTarget.href.indexOf("?")?"":e.currentTarget.href.slice(e.currentTarget.href.indexOf("?")+1);FacetFiltersForm.renderPage(e)}}FacetFiltersForm.filterData=[],FacetFiltersForm.searchParamsInitial=window.location.search.slice(1),FacetFiltersForm.searchParamsPrev=window.location.search.slice(1),customElements.define("facet-filters-form",FacetFiltersForm),FacetFiltersForm.setListeners();class PriceRange extends HTMLElement{constructor(){super(),this.querySelectorAll("input").forEach(e=>{e.addEventListener("change",this.onRangeChange.bind(this)),e.addEventListener("keydown",this.onKeyDown.bind(this))}),this.setMinAndMaxValues()}onRangeChange(e){this.adjustToValidValues(e.currentTarget),this.setMinAndMaxValues()}onKeyDown(e){e.metaKey||e.key.match(/[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/)||e.preventDefault()}setMinAndMaxValues(){var e=this.querySelectorAll("input"),t=e[0],e=e[1];e.value&&t.setAttribute("data-max",e.value),t.value&&e.setAttribute("data-min",t.value),""===t.value&&e.setAttribute("data-min",0),""===e.value&&t.setAttribute("data-max",e.getAttribute("data-max"))}adjustToValidValues(e){var t=Number(e.value),r=Number(e.getAttribute("data-min")),a=Number(e.getAttribute("data-max"));t<r&&(e.value=r),a<t&&(e.value=a)}}customElements.define("price-range",PriceRange);class FacetRemove extends HTMLElement{constructor(){super();var e=this.querySelector("a");e.setAttribute("role","button"),e.addEventListener("click",this.closeFilter.bind(this)),e.addEventListener("keyup",e=>{e.preventDefault(),"SPACE"===e.code.toUpperCase()&&this.closeFilter(e)})}closeFilter(e){e.preventDefault(),(this.closest("facet-filters-form")||document.querySelector("facet-filters-form")).onActiveFilterClick(e)}}customElements.define("facet-remove",FacetRemove);