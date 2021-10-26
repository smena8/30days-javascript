const filterBtns = document.querySelectorAll('button[data-filter]');
const dataTags = Array.from(document.querySelectorAll('div[data-tag]')); //converts nodelist of elements to array
const gallery = document.querySelector('.gallery');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterTag = btn.dataset.filter;
        if (filterTag === 'all') {
            dataTags.forEach( thumb => {
                thumb.style.display = 'block';
            })
        } else {
            galleryThumbsDisplay = dataTags.filter(tag => tag.dataset.tag === filterTag);
            galleryThumbsNone = dataTags.filter(tag => tag.dataset.tag !== filterTag);
            galleryThumbsDisplay.forEach( thumb => {
                thumb.style.display = 'block';
            })
            galleryThumbsNone.forEach( thumb => {
                thumb.style.display = 'none';
            })
        }


    })


})
