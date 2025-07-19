// Add event listener for each section with the class "toggleClip"
const sections = document.querySelectorAll('.toggleClipSection');

sections.forEach(section => {
    section.addEventListener('click', () => {
        const oval = section.querySelector('.oval');
        const exploreButton = section.querySelector('#exploreButton');
        
        if (oval.classList.contains('toggled')) {
            // If the clicked section is already expanded, collapse it
            oval.classList.remove('toggled');
            exploreButton.classList.add('hidden');
        } else {
            // Collapse any previously expanded section
            sections.forEach(sec => {
                const otherOval = sec.querySelector('.oval');
                const otherExploreButton = sec.querySelector('#exploreButton');
                if (otherOval.classList.contains('toggled')) {
                    otherOval.classList.remove('toggled');
                    otherExploreButton.classList.add('hidden');
                }
            });

            // Expand the clicked section
            oval.classList.add('toggled');
            exploreButton.classList.remove('hidden');
        }
    });
});
