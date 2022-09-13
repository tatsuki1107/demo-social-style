import './index.css';
import React from 'react';
import StartButton from '../../components/StartButton';
import Footer from '../../components/Oganisms/Footer';
import { useNavigate } from 'react-router-dom';
import graph_img from '../../img/SocialStyle_graph.jpg'

const TopPage = () => {
  const navigate = useNavigate();
  const goNextPage = () => {
    navigate('/diagnosis')
  }
  return (
    <>

      <div className="App">
        
        <header></header>
        
        <div className='Top'>
          <div className="Top_title">
            <h1>ソーシャルスタイル診断</h1>
            <h3>Cheer Career</h3>
          </div>
          
          <div className='startButton-1'>
            <StartButton onClick={goNextPage} />
          </div>
        </div>
        
        <main>
          <section className='explanation'>
            <div className="exp_title">
                <h2 className='exp_title_txt01'>ソーシャルスタイルって</h2>
                <h2 className='exp_title_txt02 emphasis'>ナニ？</h2>
            </div>
            <div className="exp_txt">
              <p>ソーシャルスタイルとは1968年にアメリカの産業心理学者であるデビッド・メリル氏が提唱した<span className='emphasis'>コミュニケーション</span>の理論です</p>
              <p>人の言動を4つのスタイルに分けて分析し、<span className='emphasis'>相手が望ましいと感じる対応を探し、選択する方法</span>として活用されています</p> 
              <p>人の言動を単純に4つに分けることはできませんが、大まかな方向性としていずれかのスタイルに分類されるといわれています。</p>  
            </div>             
          </section>

          <section className="graph_img">
            <img src={graph_img} alt="socialStyle_graph" />
          </section>

          <div className='startButton-2'>
            <StartButton onClick={goNextPage} />
          </div>

          <section className='help'>
              <div className='help_title'>
                <h2 className='hl_title_txt01'>こんなお悩みの</h2>
                <h2 className='hl_title_txt02'><span className='emphasis hl_emphasis'>手助け</span>になるかも！？</h2>
              </div>
              
            <div className='donKnow'>
              <div className='hl_content_title'>
                <div className='left_border'></div>
                <h3>どんな仕事が向いているのか分からない</h3>
              </div>
              <p className='hl_content_txt'>この診断では、その性格の方が「一般的に向いている仕事」を知ることが出来ます。<br />
                それをもとにインターンや説明会に参加すれば、本当に自分に合った仕事・企業に出会えるかも？？
              </p>
              <a href='' className='intern emphasis'>インターン・説明会を探す→</a>
            </div>

            <div className='relationship'>
              <div className='hl_content_title'>
                <div className='left_border'></div>
                <h3>人間関係が上手くいかない</h3>
              </div>
              <p className='hl_content_txt'>この診断では、その性格と相性が良くないタイプと、そのタイプとの上手な付き合い方を知ることが出来ます。<br />
                そのタイプの特性を知ることで、人間関係を良好な状態に保つ努力をすることができます。</p>
            </div>
          </section>

          {/* 一旦放置 */}
          <div className='backToTop'>
            <div className='maru'><div className='sannkaku'></div></div>
          </div>

          <div className='startButton-3'>
            <StartButton onClick={goNextPage} />
          </div>
        </main>
        <Footer />
      </div>
      
    </>
  );
}

export default TopPage;
