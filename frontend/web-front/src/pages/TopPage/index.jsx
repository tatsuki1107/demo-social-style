import './index.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import tmp_graph_img from '../../img/graph.jpg';
import { useAuth } from '../../Routings/AuthService';

// components
import Button from '../../components/Atoms/Button';
import Template, { Main } from '../../components/Templates';
import Typography from '../../components/Atoms/Typography';
import ContentTitle from '../../components/Atoms/ContentTitle';

const TopPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const goNextPage = () => {
    if (user.token === "") {
      window.location.href = 'http://localhost/test_auth';
    } else {
      navigate('/diagnosis', window.scrollTo(0, 0))
    }
  }
  return (
    <>
      <Template>
        <div className='Top'>
          <div className="Top_title">
            <Typography type="h1" color="white">
              ソーシャルスタイル診断
            </Typography>
            <Typography type="h3" size="m" color="white">
              Cheer Career
            </Typography>
          </div>

          <div className='startButton-1'>
            {user.token === "" ?
              <Button onClick={goNextPage} type="start">
                ログインして診断する
              </Button>
              :
              <Button onClick={goNextPage} type="start">
                今すぐ診断する
              </Button>}
          </div>
          <div className="scrolldown1"><span>Scroll</span></div>
        </div>
        <Main>
          <section className='explanation'>
            <div className="exp_title">
              <Typography type="h2">
                ソーシャルスタイルって<br /><span>ナニ？</span>
              </Typography>
            </div>
            <div className="exp_txt">
              <Typography type="text" size='m' color='black'>
                ソーシャルスタイルとは1968年にアメリカの産業心理学者であるデビッド・メリル氏が提唱した<span>コミュニケーション</span>の理論です
              </Typography>
              <Typography type="text" size='m' color='black'>人の言動を4つのスタイルに分けて分析し、<span>相手が望ましいと感じる対応を探し、選択する方法</span>として活用されています
              </Typography>
              <Typography type="text" size='m' color='black'>
                人の言動を単純に4つに分けることはできませんが、大まかな方向性としていずれかのスタイルに分類されるといわれています。
              </Typography>
            </div>
          </section>

          <section className="graph_img">
            <img src={tmp_graph_img} alt="socialStyle_graph" />
          </section>

          <div className='startButton-2'>
            {user.token === "" ?
              <Button onClick={goNextPage} type="start">
                ログインして診断する
              </Button>
              :
              <Button onClick={goNextPage} type="start">
                今すぐ診断する
              </Button>}
          </div>

          <section className='help'>
            <div className='help_title'>
              <Typography type="h2">
                こんなお悩みの<br /><span>手助け</span>になるかも！？
              </Typography>
            </div>

            <div className='donKnow'>
              <ContentTitle>向いている仕事がよく分からない</ContentTitle>
              <div className='hl_content_txt'>
                <Typography type="text" size="s" color="black">
                  この診断では、その性格の方が「一般的に向いている仕事」を知ることが出来ます。<br />
                  それをもとにインターンや説明会に参加すれば、本当に自分に合った仕事・企業に出会えるかも？？
                </Typography>
              </div>
              <a href='https://cheercareer.jp/search/offer_list' className='intern empasis' target="_blank">
                インターン・説明会を探す→
              </a>
            </div>

            <div className='relationship'>
              <ContentTitle>人間関係が上手くいかない</ContentTitle>
              <div className='hl_content_txt'>
                <Typography type="text" size='s' color="black">
                  この診断では、その性格と相性が良くないタイプと、そのタイプとの上手な付き合い方を知ることが出来ます。<br />
                  そのタイプの特性を知ることで、人間関係を良好な状態に保つ努力をすることができます。
                </Typography>
              </div>
            </div>
          </section>

          {/* 一旦放置 */}
          <div className='backToTop'>
            <div className='maru'><div className='sannkaku'></div></div>
          </div>

          <div className='startButton-3'>
            {user.token === "" ?
              <Button onClick={goNextPage} type="start">
                ログインして診断する
              </Button>
              :
              <Button onClick={goNextPage} type="start">
                今すぐ診断する
              </Button>}
          </div>
        </Main>
      </Template>
    </>
  );
}

export default TopPage;
