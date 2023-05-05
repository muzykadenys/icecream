import React, { useEffect, useRef, useState } from 'react'
import '../src/index.css'
import { gsap } from 'gsap'
import { IonIcon } from '@ionic/react'
import { removeOutline, addOutline } from 'ionicons/icons'

function MixInterface() {
  const [showForm, setShowForm] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(2)
  const price = 2
  const inpMax = 1000
  const inpMin = 1

  const getTextRef = useRef()
  const stickBtnRef = useRef()
  const formRef = useRef()
  const congratsRef = useRef()
  // --------------------------------------------

  const onChangeAmount = (e) => {
    const value = e.target.value
    setAmount(value)

    getTextRef.current.innerText = `g${'e'.repeat(value)}t`
  }

  const changeAmountByClick = (value) => {
    setAmount((e) => {
      const def = parseInt(e) + parseInt(value)
      if (def >= inpMin && def <= inpMax) {
        getTextRef.current.innerText = `g${'e'.repeat(def)}t`
        return def
      }
      return e
    })
  }

  const onHideForm = (e) => {
    e.preventDefault()
    setShowForm(false)

    const svgEl = document.querySelector('.circles')
    gsap.to(svgEl.style, { scale: 4, duration: 1 })
  }

  const onShowForm = () => {
    setShowForm(true)

    const svgEl = document.querySelector('.circles')
    gsap.to(svgEl.style, { scale: 7, duration: 1 })
  }

  const onClickGet = () => {
    setShowCongrats(true)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  // Prevent default behavior of the wheel and touchmove events
  function preventDefault(e) {
    e.preventDefault()
  }

  const stickBtnAnimation = () => {
    var mArea = document.querySelector('#magnetic-area')

    // 1. Set the function and variables
    function parallaxIt(e, target, movement = 1) {
      var boundingRect = mArea.getBoundingClientRect()
      var relX = e.pageX - boundingRect.left
      var relY = e.pageY - boundingRect.top
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop

      gsap.to(target, {
        x: (relX - boundingRect.width / 2) * movement,
        y: (relY - boundingRect.height / 2 - scrollTop) * movement,
        ease: 'power1',
        duration: 0.6,
      })
    }

    // 2. Call the function
    function callParallax(e) {
      parallaxIt(e, '#magnetic-content')
    }

    mArea.addEventListener('mousemove', function (e) {
      callParallax(e)
    })

    mArea.addEventListener('mouseleave', function (e) {
      gsap.to('#magnetic-content', {
        scale: 1,
        x: 0,
        y: 0,
        ease: 'power3',
        duration: 0.6,
      })
    })
  }

  useEffect(() => {
    if (showCongrats && congratsRef.current) {
      gsap.from(congratsRef.current, { opacity: 0, duration: 1 })
    }
  }, [showCongrats])

  useEffect(() => {
    if (showForm) {
      if (formRef.current) {
        formRef.current.scrollIntoView()
        formRef.current.addEventListener('wheel', preventDefault, {
          passive: false,
        })
      }
    } else {
      if (formRef.current)
        formRef.current.removeEventListener('wheel', preventDefault)
      stickBtnAnimation()
    }
  }, [showForm])

  return (
    <div className="MixInterfaceSection">
      {showCongrats ? (
        <div ref={congratsRef} className="MixInterfaceSection_Congratulations">
          <div className="MixInterfaceSection_Congratulations_body">
            🎉icecream🎉
          </div>
        </div>
      ) : null}

      {!showForm ? (
        <div class="safe-wrap">
          <div onClick={onShowForm} id="magnetic-wrap">
            <div id="magnetic-area" class="magnetic-size"></div>
            <div id="magnetic-content">
              <div class="my-burger">take!</div>
            </div>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <div
          ref={formRef}
          onClick={onHideForm}
          className="MixInterfaceSection_wrapper"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="MixInterfaceSection_form"
          >
            <div className="MixInterfaceSection_form_top MixInterfaceSection_form_bg">
              <div className="MixInterfaceSection_form_top_contentLeft">
                ice
                <br />
                cre
                <br />
                am
              </div>

              <div className="MixInterfaceSection_form_top_contentRight">
                <div className="MixInterfaceSection_form_top_contentRight_expresion">
                  {price}$ * {amount} =
                </div>
                <div className="MixInterfaceSection_form_top_contentRight_result">
                  {amount * price}$
                </div>
              </div>
            </div>

            <div className="MixInterfaceSection_form_mid MixInterfaceSection_form_bg">
              <div
                onClick={() => changeAmountByClick(-1)}
                className="MixInterfaceSection_form_mid_minus MixInterfaceSection_form_mid_btn"
              >
                <IonIcon icon={removeOutline} />
              </div>

              <input
                onChange={onChangeAmount}
                value={amount}
                type="range"
                min={inpMin}
                max={inpMax}
                class="slider"
                id="myRange"
              />

              <div
                onClick={() => changeAmountByClick(1)}
                className="MixInterfaceSection_form_mid_plus MixInterfaceSection_form_mid_btn"
              >
                <IonIcon icon={addOutline} />
              </div>
            </div>

            <div
              onClick={onClickGet}
              className="MixInterfaceSection_form_bot MixInterfaceSection_form_bg"
            >
              <p ref={getTextRef} className="MixInterfaceSection_form_bot_text">
                get
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MixInterface
