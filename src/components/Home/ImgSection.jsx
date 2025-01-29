import externalImages from '../../assets/external-img.json';

const ImgSection = () => {
    return (
        <section>
            <div className="flex mb-7 md:mb-0">
                <img className="ml-0 md:ml-auto w-1/2 md:w-3/12" src={externalImages.homePage_top_banners[0]} alt="home page mid section img 1" />
                <img className="mr-0 md:mr-auto w-1/2 md:w-3/12" src={externalImages.homePage_top_banners[1]} alt="home page mid section img 2" />
            </div>
        </section>
    )
}

export default ImgSection;