

'use strict'; 

function titleClickHandler(event){   
  event.preventDefault();
  const clickedElement = this;       //  oznacza element któremu jest nadany listener
  console.log('Link was clicked!');
  
  
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
    
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

/*const links = document.querySelectorAll('.titles a');  //przeniesiona (zadanie ze znalezieniem buga)
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}*/

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks(customSelector = ''){ // zmiana funkcji, argument customSelector, który domyślnie jest pustym ciągiem znaków

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector + customSelector);
  titleList.innerHTML = '';   // czyszczenie zawartości? czy my tego nie zrobilismy ręcznie?

  /*  for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';  
  for(let article of articles){
        
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE]find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; 

    /* get the title from the title element */
         

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('działa'); 
    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);
    
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
   
}
generateTitleLinks();




function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* [DONE]find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);


    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</span></a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHtml;
    
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    const tagList = document.querySelectorAll('a[href^="#tag-"]'); //^= oznacza atrybut href zaczynający się od "#tag-"
    for(let tag of tagList) {
      tag.addEventListener('click', titleClickHandler);
    }

    /* END LOOP: for every article: */
}

};

generateTags();



function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;       //  oznacza element któremu jest nadany listener

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');  // do czego się odwołać + zapis? // wszystkie linki, które mają taki sam atrybut href, jak kliknięty link
  /* START LOOP: for each found tag link */
  for(let foundTagLink of foundTagLinks){
    /* add class active */
    foundTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]'); // zapis ~= znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'"
}


function addClickListenersToTags(){
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let linkTag of linkTags){
    /* add tagClickHandler as event listener for that link */
  linkTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
}
}

addClickListenersToTags();
