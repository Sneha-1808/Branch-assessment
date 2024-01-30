import Link from "next/link";

export default function HomePage(){
    return(
        <div className="home">
        <img src="https://d2c5ectx2y1vm9.cloudfront.net/assets/index_local/index_local_hero_sm.en_IN-d20e4f4132d15abdd6ee4006c08012ac92faac446e27066e384670d6570aff98.png" width={660} height={660} className="front-img"></img>
            <div className="home-left">
            <h2 className="welcome-text">Welcome to our customer support.</h2>
            <div className="btn flex mt-10 gap-12">
                <Link className="btn-primary " href={'/admin'}>Login as admin</Link>
                <Link className="btn-primary " href={'/customer'}>Login as customer</Link>
            </div>
            </div>
        </div>
    )
}