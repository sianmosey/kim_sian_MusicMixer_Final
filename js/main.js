(() => {
    
    const icons = ['iconOne', 'iconTwo', 'iconThree', 'iconFour'];
    
    let iconsBox = document.querySelector('#iconsCon'),
        treeBox = document.querySelector('#treeCon'),
        iconSelectors = document.querySelectorAll('#iconButtons img'),
        dropBoxes = document.querySelectorAll('.dropBox'),
        audios = document.querySelectorAll('audio'),
        play = document.querySelector('#play'),
        pause = document.querySelector('#pause');
    
    function createIcons(pictureIndex) {
        
        icons.forEach((icon, index) => {
            let newIcons = `<img draggable id="${icon + pictureIndex}" class="iconsImages" data-iconref="${pictureIndex}" data-musicref="${icon + pictureIndex}" src="images/${icon + pictureIndex}.svg" alt="icon thumbnail">`
            
            iconsBox.innerHTML += newIcons;
            iconsBox.dataset.iconref = `${pictureIndex}`;
        });
        
        initDrag();
        
    }
    
    function initDrag() {
		iconsBox.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				// e.preventDefault();
				console.log('draggin...')

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}
    
    function resetAudio() {
        audios.forEach(audio => {
            audio.currentTime = 0;
        });
    }
    
    dropBoxes.forEach(box => {
        
        box.addEventListener("dragover", function(e) {
            e.preventDefault();
            console.log('dragging over me');
        });
        
        box.addEventListener("drop", function(e) {
            e.preventDefault();
            console.log('you dropped it on me');
            
            
            let icon = e.dataTransfer.getData("text/plain");
            
            if (box.childNodes.length < 1) {
                e.target.appendChild(document.querySelector(`#${icon}`));
            } else {
                return false;
            }
            
            this.firstChild.classList.add('animateIcon');
            
            resetAudio();
            
            audios.forEach(audio => {
                if (audio.dataset.musicref == document.querySelector(`#${icon}`).dataset.musicref) {
                    audio.muted = false;
                    audio.play();
                }   
            });
            
        });
        
        box.addEventListener("click", function(e) {
            console.log('clicked me');
            
            let image = e.target;
            box.removeChild(image);
            image.classList.remove('animateIcon');
            
            audios.forEach(audio => {
                if (audio.dataset.musicref == image.dataset.musicref) {
                    audio.muted = true;
                }
            });
            
            if (image.dataset.iconref == iconsBox.dataset.iconref) {
                if (iconsBox.children.length < 4) {
                    iconsBox.appendChild(image);
                }
            }
        });
        
    });
    
    play.addEventListener("click", function(e) {
        console.log('click');
        audios.forEach(audio => {
            audio.play();
        });
    });
    
    pause.addEventListener("click", function(e) {
        console.log('click');
        audios.forEach(audio => {
            audio.pause();    
        });
    });
    
    
    function resetIcons() {
        iconsBox.innerHTML = "";
        createIcons(this.dataset.iconref);
    }
    
    iconSelectors.forEach(iconImage => iconImage.addEventListener('click', resetIcons));
    
    createIcons(0);
    
    
})();
