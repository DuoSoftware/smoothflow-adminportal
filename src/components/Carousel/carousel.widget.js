import React, { Component } from 'react';
import './carousel.scss';
import Slider from "react-slick";
import {KEY} from "../../_base/services";

class Carousel extends Component {
    settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };

    getSlides(slides) {
        const _slides = slides.map((slide) => {
            if(slide.type === 'image') {
                return <div key={KEY()}><img src={ slide.file } alt=""/></div>
            }
        });
        return _slides;
    }

    render() {
        return (
            <Slider {...this.settings}>
                { this.getSlides(this.props.slides) }
            </Slider>
        )
    }
}

export default Carousel;