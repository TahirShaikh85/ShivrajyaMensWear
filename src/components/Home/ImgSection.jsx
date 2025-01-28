import externalImages from '../../assets/external-img.json';

const ImgSection = () => {
    return (
        <section>
            <div className="flex">
                <img className="ml-auto w-3/12" src={externalImages.homePage_top_banners[0]} alt="home page mid section img 1" />
                <img className="mr-auto w-3/12" src={externalImages.homePage_top_banners[1]} alt="home page mid section img 2" />
            </div>
        </section>
    )
}

export default ImgSection;