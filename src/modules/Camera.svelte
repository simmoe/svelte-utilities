
<script>

let image, canvas, video
let picTaken = false
//The width to height ratio of a Golden Rectangle is 1:1.618
let height = 300
let width = height * 1.618

const takepicture = () => {
    var context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, width, height)    
    var data = canvas.toDataURL('image/png')
    image.setAttribute('src', data)
    image.style.transform = 'translateX(0)'
    picTaken = true
}

const clear = () => {
    image.style.transform = 'translateX(-100%)'
    picTaken = false
}

const save = (node) => {
    node.target.href = image.src
    node.target.download = 'profile.png'
}

const startvideo = (node) => {
    navigator.mediaDevices.getUserMedia({ video: { width: width, height: height }, audio: false})
    .then(function(stream) {
        canvas.setAttribute('height', height)
        canvas.setAttribute('width', width)
        node.srcObject = stream
        node.play()
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    })
}
</script>

<canvas bind:this={canvas} />
<section>
    <video bind:this={video} class="video" use:startvideo />
    <img class='golden'  src="./assets/golden.png" alt="">
    <img class='photo' src="" alt="camera" bind:this={image} />
    <div class="buttons">    
        <button on:click={takepicture}>take a picture</button>
        {#if picTaken}
            <button on:click={clear}>clear</button>
            <a on:click={save}>save</a>
        {/if}
    </div>
</section>

<style>
    section{
        position:relative;
        overflow:hidden;
    }
    canvas{
        display:none;
    }
    video{
        justify-self:start;
    }
    .golden{
        position:absolute;
        left:0;
        top:0;
        height:100%;
    }
    .photo{
        position:absolute;
        left:0;
        transform:translateX(-100%);
        transition:.6s ease;
    }
    .buttons{
        position:absolute;
        display:grid;
        right:2rem;
        bottom:2rem;
    }
</style>