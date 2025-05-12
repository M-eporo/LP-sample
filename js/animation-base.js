gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

function splitAndAnimate(selector, staggerDelay, splitType) {
  const split = new SplitText(selector, { type: splitType });
  const target = split[splitType];
  gsap.set(target, { autoAlpha: 0, scale: 0, y: 30, rotationX: 10 });
  return gsap.to(target, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    rotationX: 0,
    stagger: staggerDelay,
    transformOrigin: "0% 50",
    ease: "power2.out"
  });
}

//アンカーリンクのスムーススクロール
document.querySelectorAll(".header .container nav ul li a").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute("href");
    gsap.to(window, {
      duration: 1,
      scrollTo: targetId,
      ease: "power1.out"
    });
  });
});

let lastY = 0;
const nav = document.querySelector(".header .container nav");
window.addEventListener("scroll", e => {
  const currentY = window.pageYOffset;
  if (currentY > lastY) {
    console.log("down");
  } else if(currentY < lastY) {
    console.log("up")
  }
  lastY = currentY <= 0 ? 0 : currentY;
})

// header-aniamtion
// const headerH2 = new SplitText(".header .first-view .text h2 .catch", { type: "chars, words, lines" });
// const headerH1 = new SplitText(".header .first-view .text h1 .catch", { type: "chars, words, lines" });
// gsap.set([headerH2.words, headerH1.chars], {
//   autoAlpha: 0,
//   y: 100,
//   rotationX: 360
// });
// gsap.set(".header .first-view .text ul li", {
//   autoAlpha: 0,
//   y: 100
// });
// const headerAnimation = gsap.timeline()
//   .from(".header nav .logo", {
//     autoAlpha: 0,
//     x: -100,
//     filter: "blur(30px)"
//   })
//   .from(".header nav ul li", {
//     autoAlpha: 0,
//     y: 60,
//     filter: "blur(30px)",
//     stagger: 0.1,
//   }, "<")
//   .to(headerH2.words, {
//     autoAlpha: 1,
//     y: 0,
//     rotationX: 0,
//     ease: "power2.out",
//     stagger: 0.2
//   })
//   .to(headerH1.chars, {
//     autoAlpha: 1,
//     y: 0,
//     rotationX: 0,
//     ease: "power2.out",
//     stagger: 0.1
//   }, ">-1")//前のアニメの終了時刻 -0.5秒前に開始
//   .to(".header .first-view .text ul li", {
//     autoAlpha: 1,
//     y: 0,
//     stagger: 0.1
//   }, "-=0.2")//前のアニメの開始時刻 -0.2秒前に開始
//   .from(".header .first-view .text .sentence", {
//     autoAlpha: 0,
//     y: 100
//   }, "-=0.2")//前のアニメの開始時刻 -0.2秒前に開始
//   .from(".header .first-view .splide", {
//     autoAlpha: 0,
//     filter: "blur(30px)",
//     duration: 0.5,
//   }, "<");//前と同時に発火

// whatのアニメーション
const whatAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: ".what",
    start: "top 40%",
    //markers: true,
  }
})
  .addLabel("bg-image")
  .from(".what .bg-image", {
    autoAlpha: 0,
    duration: 1.0,
  })
  .addLabel("bg-color")
  .from(".what .bg-color", {
    autoAlpha: 0,
    yPercent: 100,
    transformOrigin: "center bottom"
  }, "<=1")//直前終了から1秒後にスタート
  .addLabel("heading")
  .from(".what .back p", {
    autoAlpha: 0,
    y: -100,
  }, "<+0.2")
  .addLabel("circle")
  .from(".what .container .mark-wrapper ul li", {
    autoAlpha: 0,
    y: 100, stagger: 0.1
  }, "<")
  .add(splitAndAnimate(".what .container .text h2", 0.04, "chars"), "<")
  .add(splitAndAnimate(".what .container .sentence", 0.01, "chars"), "<=0.5")//前のアニメが終わってから 0.15秒後に開始

// worksアニメーション
const worksAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: ".works",
    start: "top 45%",
    toggleActions: "play reverse play reverse"
  },
})
  .from(".works .bg", {
    autoAlpha: 0,
    filter: "blur(30px)",
    x: 100, y: 100,
    duration: 1
  })
  .from(".works .title h3", {
    autoAlpha: 0,
    y: -50
  }, "<=0.5") //前の完了後0.5秒後に発火
  .from(".works .title h2", {
    autoAlpha: 0,
    y: 50
  }, "<=0.1") //前の完了後0.1秒後に発火
  .from(".works .splide", {
    autoAlpha: 0,
    y: 100,
    duration: 1.5
  }, ">-0.6"); //直前終了の0.6秒前に開始

// featureのアニメーション
const featureTitleAnimation = gsap.timeline({
  defaults: {
    autoAlpha: 0,
    filter: "blur(30px)",
    x: -100,
    y: 100, 
    duration: 0.75,
  },
  scrollTrigger: {
    //markers: true,
    trigger: ".feature",
    start: "top 45%",
    toggleActions: "play reverse play reverse"
  }
})
  .from(".feature .container .title .text h3", { duration: 1.0 })
  .from(".feature .container .title .text h2", {}, "<=0.25") //直前終了後、0.25秒後に発火
  .from(".feature .container .title .thumb", { x: 100 }, "<=0.5") //直前終了後、0.5秒後に発火

//ここのboxにスクロールトリガーを設定できない。
//一番上のboxに到達した時点で、他のboxのアニメーションもスタートしてしまう。
// const featureBoxAnimation = gsap.timeline({
//   defaults: {
//     autoAlpha: 0,
//     filter: "blur(30px)",
//     x: -100, y: 100,
//     duration: 0.75,
//   },
//   scrollTrigger: {
//     trigger: ".feature .container .box-wrapper .box",
//     start: 'top 45%',
//     markers: true,
//   }
// })
// //1秒ずれて、サムネイルが出現する
// .from(".feature .top .thumb", { duration: 1.0, stagger: 1.0});

//ここのboxにスクロールトリガーを設定できる。
const featureBoxes = gsap.utils.toArray(".feature .container .box-wrapper .box");
featureBoxes.forEach((target) => {
  const thumb = target.querySelector(".top .thumb");
  const textElements = target.querySelectorAll(".top .text .en, .top .text h3");
  const textLi = target.querySelectorAll(".top .text ul li");
  const geometory = target.querySelector(".top .text .geometory");
  const sentence = target.querySelector(".bottom .sentence");

  const featureBoxAnimation = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      filter: "blur(30px)",
      x: -100,
      y: 100,
      duration: 0.75,
    },
    scrollTrigger: {
      trigger: target,
      start: 'top 45%',
      // markers: true,
    },
  })
    .from(thumb, { duration: 1.0 })
    .from(textElements, {}, "<=0.25") //前の終了後、0.25秒後に発火
    .from(textLi, { x: 100, stagger: 0.1 }, "-=0.5") //前の開始0.5秒前に発火
    .from(geometory, { x: 100 }, "<")
    .from(sentence, { x: 100 }, "<");
});

// meritのアニメーション
const meritTitleAnimation = gsap.timeline({
  defaults: {
    autoAlpha: 0,
    filter: "blur(30px)",
    scale: 2,
    duration: 1.5,
  },
  scrollTrigger: {
    trigger: ".merit .title",
    start: "top 50%",
  },
})
  .from(".merit .container .title h3", {})
  .from(".merit .container .title h2", {}, "<");

const meritBoxes = gsap.utils.toArray(".merit .container .box-wrapper .box");
meritBoxes.forEach((target) => {
  const thumbElements = target.querySelectorAll(".thumb-wrapper .thumb");
  const textElements = target.querySelectorAll(".text .back, .text .inset .semi-title .number, .text .inset .semi-title h3, .text .inset .sentence");
  
  const meritBoxAnimation = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      filter: "blur(30px)",
      x: -100, y: 100,
      duration: 0.75,
    },
    scrollTrigger: {
      trigger: target,
      start: "top 45%",
      markers: true
    },
  })
    .from(thumbElements, {
      x: (i) => i % 2 === 0 ? -100 : 100,
      stagger: 0.1,
      duration: 1.0,
    })
    .from(textElements, {
    stagger: 0.1,
    }, "<=0.25")
});

//Flowのアニメーション
const flowTitleAnimation = gsap.timeline({
  defaults: {
    autoAlpha: 0,
    filter: "blur(30px)",
    scale: 2,
    duration: 1.15,
  },
  scrollTrigger: {
    trigger: ".flow .title",
    start: "top 55%"
  },
})
  .from(".flow .container .title h3", {})
  .from(".flow .container .title h2", {}, "<");

gsap.from(".flow .container .box-wrapper .box", {
  autoAlpha: 0,
  y: 100,
  filter: "blur(30px)",
  stagger: 0.25,
  scrollTrigger: {
    trigger: ".flow .container .box-wrapper",
    start: "top 60%"
  }
});

// ctaのアニメーション
const ctaElements = gsap.utils.toArray(".cta");
ctaElements.forEach((target) => {
  const inner = target.querySelector(".cta .container .inner");
  const h2 = target.querySelector(".cta .container h2");
  const sentence = target.querySelector(".cta .container .inner .block .sentence");
  const blockLi = target.querySelectorAll(".cta .container .inner .block ul li");
  const blockForm = target.querySelectorAll(".cta .container .inner .block .form");

  const ctaAnimation = gsap.timeline({
    defaults: {
      autoAlpha: 0,
      filter: "blur(30px)",
      y: 100,
      duration: 0.75,
    },
    scrollTrigger: {
      trigger: target,
      start: "top 45%",
    },
  })
    .from(inner, { filter: "blur(60px)", duration: 1.0 })
    .from(h2, { x: -100, duration: 1.0 }, "-=0.5") //前の開始0.5秒前に開始
    .from(sentence, { x: -100 }, "<=0.25") //前が終了後0.25秒後に開始
    .from(blockLi, { x: 100, stagger: 0.25 }, "-=0.5") //前の開始0.5秒前に開始
    .from(blockForm, { x: 100 }, "<");
});

// footerのアニメーション
const footer = document.querySelector(".footer");
const footerLogoPlane = footer.querySelector(".logo .plane");
const footerLogoWhite = footer.querySelector(".logo .white");
const footerLinks = footer.querySelectorAll(".container .top nav ul li a, .container .privacy p a, .container .copyright small");
gsap.set(footer, {
  background: 
  "linear-gradient(90deg, rgba(210,210,210,1) 0%, rgba(255,255,255,1) 100%)"
})
gsap.set(footerLinks, { color: "#111" });
gsap.set(footerLogoWhite, { autoAlpha: 0 });
const footerAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: "top 45%",
  },
})
  .to(footer, {
    background: 
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
    duration: 1.25
  })
  .to(footerLogoPlane, { autoAlpha: 0 }, "<")
  .to(footerLogoWhite, { autoAlpha: 1 }, "<")
  .to(footerLinks, { color: "#fff", stagger: 0.15 }, "<=0.5");


