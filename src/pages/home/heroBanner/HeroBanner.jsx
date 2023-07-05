import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetchs";

import './style.scss'
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

export default function HeroBanner() {

    const [background, setBackground] = useState("");
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const { data, loading } = useFetch("/movie/upcoming")
    console.log(loading);


    useEffect(() => {
        const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)].backdrop_path
        setBackground(bg)
    }, [data])

    const searchQueryHandle = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className="heroBanner">

            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}

            <div className="opacity_layer">
                
            </div>

            <ContentWrapper>
                <div className="heroBanner_content">
                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Quibusdam illum
                    </span>
                    <div className="searchInput">
                        <input type="text"
                            placeholder="Search for a movie or TV show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandle}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
};

// export default HeroBanner;
