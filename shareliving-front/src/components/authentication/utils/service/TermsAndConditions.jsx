import React from 'react';

const TermsAndConditions = () => {
  const checkAllAgre = (e) => {
    // Implement check all logic here
    console.log(e.target.checked);
  };

  const ipinCk = () => {
    // Implement IPIN verification logic here
    alert('IPIN 인증');
  };

  const selfphoneCk = () => {
    // Implement mobile phone verification logic here
    alert('휴대폰 인증');
  };

  return (
    <fieldset>
      <legend>회원가입</legend>
      <div>
        <h3>약관동의</h3>
        <div className="joinCondition_box" tabIndex="0">
          <div className="border_box clause">
            <div className="top_m10">
              <div className="infoBox">
                <h4 className="mb0">제1장 총칙</h4>
                <h5 className="mb0">제1조<span>(목적)</span></h5>
                <p className="mt0 pt0">
                  본 약관은 대·중소기업·나눔재단 기술보호통합포털(이하 "당 관리시스템")이 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 관리시스템의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
                {/* Continue adding the terms and conditions text here */}
              </div>
            </div>
          </div>
        </div>
        <p className="join_check">
          <input type="checkbox" name="stplatAgreChk" id="stplatAgreChk" />
          <label htmlFor="stplatAgreChk">
            <span>이용약관에 동의합니다.(필수)</span>
          </label>
        </p>
      </div>

      <h3>개인정보 수집 이용 조회 동의</h3>
      <div className="joinCondition_box" tabIndex="0">
        <div className="border_box clause">
          <div className="top_m10">
            <div className="infoBox">
              <p>대·중소기업·나눔재단(이하 “재단” 이라 한다)은...</p>
              {/* Add more content here as needed */}
            </div>
          </div>
        </div>
        <p className="join_check">
          <input type="checkbox" name="indvdlinfoChk" id="indvdlinfoChk" />
          <label htmlFor="indvdlinfoChk">
            <span>위와 같이 본인의 개인정보를 수집·이용하는 것에 동의합니다.(필수)</span>
          </label>
        </p>
      </div>

      <h3>정책정보 제공을 위한 수집 및 이용 동의</h3>
      <div className="joinCondition_box" tabIndex="0">
        <div className="infoBox">
          <h5 className="mb0">1. 개인정보의 수집 및 이용 목적</h5>
          <p className="mt0 pt0">- 정부 및 지자체의 중소·중견기업 분야별 지원정책 및 참여기회 제공</p>
          {/* Continue adding content here */}
        </div>
        <p className="join_check">
          <input type="checkbox" name="policyInfoChk" id="policyInfoChk" />
          <label htmlFor="policyInfoChk">
            <span className="txt_normal">정책정보 제공을 위한 개인정보 수집 및 이용에 동의합니다.(선택)</span>
          </label>
        </p>
      </div>

      <p className="join_check all_check">
        <input type="checkbox" name="allAgreChk" onClick={checkAllAgre} id="allAgreChk" />
        <label htmlFor="allAgreChk">
          <span>위 약관에 전체 동의합니다.</span>
        </label>
      </p>

      <div className="tc mt30">
        <button className="member_button join_button" onClick={ipinCk}>아이핀 인증</button>
        <button className="member_button join_button" onClick={selfphoneCk}>휴대폰 인증</button>
      </div>
    </fieldset>
  );
};

export default TermsAndConditions;