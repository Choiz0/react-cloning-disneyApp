import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

const truncate = (str, n) => {
  return str?.length > n ? str.substring(0, n) + "..." : str;
};

const Banner = () => {
  const [showBackgroundBanner, setShowBackgroundBanner] = useState(undefined);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    const { data: movieDetail } = await axios.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos",
      },
    });
    setShowBackgroundBanner(movieDetail);
  };

  if (!showBackgroundBanner) {
    return <>Loading...</>;
  }

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${showBackgroundBanner?.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {showBackgroundBanner?.title ||
              showBackgroundBanner?.name ||
              showBackgroundBanner?.original_name}
          </h1>
          <div className="banner__buttons">
            {showBackgroundBanner.videos?.results[0].key ? (
              <button
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            ) : (
              ""
            )}
          </div>

          <h1 className="banner__description">
            {truncate(showBackgroundBanner?.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }

  return (
    <>
      <button className="banner__exit" onClick={() => setIsClicked(false)}>
        X
      </button>
      <Container>
        <HomeComtainer>
          <Iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${showBackgroundBanner.videos?.results[0].key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></Iframe>
        </HomeComtainer>
      </Container>
    </>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direnction: column;
  height: 100vh;
  width: 100%;
`;

const HomeComtainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: 3;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
