(function () {
    angular.module('app').directive('nowAndRequestedCode', nowAndRequestedCode);
    /* @ng-inject */
    function nowAndRequestedCode() {
        return {
            restrict: 'A',
            template: '<td>{{label}}</td>' +
            '<td ng-class="{danger:!equals(data.now[key],data.requested[key])}">{{getCodeAndValue(data.requested[key])}}</td>' +
            '<td>{{getCodeAndValue(data.now[key])}}</td>',
            scope: {
                key: '@',
                label: '@',
                data: '='
            },
            controller: function ($scope) {
                $scope.equals = angular.equals;

                var values = {
                    "BLT_A": "A형",
                    "BLT_B": "B형",
                    "BLT_O": "O형",
                    "BLT_AB": "AB형",
                    "HTW_SEOUL": "서울",
                    "HTW_GYEONGGI": "경기",
                    "HTW_INCHEON": "인천",
                    "HTW_DAEJEON": "대전",
                    "HTW_CHUNGBUK": "충북",
                    "HTW_CHUNGNAM": "충남",
                    "HTW_GANGWON": "강원",
                    "HTW_BUSAN": "부산",
                    "HTW_GYEONGBUK": "경북",
                    "HTW_GYEONGNAM": "경남",
                    "HTW_DAEGU": "대구",
                    "HTW_ULSAN": "울산",
                    "HTW_GWANGJU": "광주",
                    "HTW_JEONBUK": "전북",
                    "HTW_JEONNAM": "전남",
                    "HTW_JEJU": "제주",
                    "REL_NONE": "종교없음",
                    "REL_CHRISTIAN": "기독교",
                    "REL_CATHOLICISM": "천주교",
                    "REL_BUDDHISM": "불교",
                    "REL_WONBUDDHISM": "원불교",
                    "REL_ISLAM": "이슬람교",
                    "REL_ETC": "기타",
                    "JOB_NM_WHITEHAND": "무직",
                    "JOB_NM_STUDENT": "학생",
                    "JOB_NM_LARGE": "대기업직원",
                    "JOB_NM_MIDSIZE": "중견기업직원",
                    "JOB_NM_VENTURE": "벤처기업직원",
                    "JOB_NM_PUBLIC": "공기업직원",
                    "JOB_NM_ETC": "기타",
                    "JOB_SP_ACCOUNT": "세무, 회계",
                    "JOB_SP_PATENT": "법률, 특허",
                    "JOB_SP_LAW": "법조인",
                    "JOB_SP_STEWARDESS": "스튜어디스",
                    "JOB_SP_TRANSLATION": "외국어, 통번역",
                    "JOB_SP_IT": "IT, 웹",
                    "JOB_SP_DESIGN": "디자인, 미술",
                    "JOB_SP_BEAUTY": "미용",
                    "JOB_SP_MEDIA": "미디어, 음악",
                    "JOB_SP_SPORT": "레저, 스포츠",
                    "JOB_SP_PROTECTION": "보안, 경호",
                    "JOB_SP_EATOUT": "외식, 식음료",
                    "JOB_SP_COUNSEL": "상담, 고객센터",
                    "JOB_SP_ETC": "기타",
                    "JOB_MD_DOCTOR": "의사",
                    "JOB_MD_PHARMACIST": "약사",
                    "JOB_MD_HERBDOCTOR": "한의사",
                    "JOB_MD_VETERINARIAN": "수의사",
                    "JOB_MD_NURSE": "간호사",
                    "JOB_MD_LPN": "간호조무사",
                    "JOB_MD_ENGINEER": "의료기사",
                    "JOB_MD_OFFICE": "사무, 원무, 코디",
                    "JOB_MD_ETC": "기타",
                    "JOB_ED_KINDERGARTEN": "유치원, 보육",
                    "JOB_ED_TEACHER": "초,중,고 교사",
                    "JOB_ED_HAGWON": "학원강사",
                    "JOB_ED_FOREIGN": "외국어, 어학원",
                    "JOB_ED_INSTRUCTOR": "전문직 강사",
                    "JOB_ED_PROFESSOR": "대학교수",
                    "JOB_ED_TEC": "기타",
                    "JOB_GO_HIGHRANK": "고위 공무원",
                    "JOB_GO_NORMAL": "일반 공무원",
                    "JOB_GO_POLICE": "경찰직",
                    "JOB_GO_FIREMAN": "소방직",
                    "JOB_GO_SPECIAL": "특수경력직",
                    "JOB_GO_SOLDIER": "장교,군인,부사관",
                    "JOB_GO_ETC": "기타",
                    "JOB_BN_AGRICULTURE": "농수산업",
                    "JOB_BN_MANUFACTURE": "제조업",
                    "JOB_BN_SALE": "도소매",
                    "JOB_BN_LODGING": "숙박업",
                    "JOB_BN_RESTAURANT": "외식업",
                    "JOB_BN_TRANSPORT": "운수업",
                    "JOB_BN_IT": "IT, 웹",
                    "JOB_BN_REALESTATE": "부동산업",
                    "JOB_BN_SERVICE": "서비스업",
                    "JOB_BN_ETC": "기타",
                    "JOB_FN_FUND": "펀드매니저",
                    "JOB_FN_BANK": "은행원",
                    "JOB_FN_SUPERVISORY": "금융감독원",
                    "JOB_FN_STOCK": "증권사",
                    "JOB_FN_INSURANCE": "보험사",
                    "JOB_FN_ETC": "기타",
                    "JOB_RD_IT": "IT개발 연구원",
                    "JOB_RD_SCIENCE": "과학 연구원",
                    "JOB_RD_MACHINE": "기계분야 기술자",
                    "JOB_RD_ELECTRON": "전기, 전자 기술자",
                    "JOB_RD_MANUFACTURE": "제조, 생산 기술자",
                    "JOB_RD_CONSTRUCTION": "건축, 건설 기술자",
                    "JOB_RD_PRODUCT": "제품 및 설계 연구원",
                    "JOB_RD_ETC": "기타",
                    "BTM_THIN": "마른",
                    "BTM_SLIM": "슬림탄탄",
                    "BTM_NORMAL": "보통",
                    "BTM_PLUMP": "통통한",
                    "BTM_MUSCULAR": "근육질",
                    "BTM_HEALTHY": "건장한",
                    "BTF_THIN": "마른",
                    "BTF_SLIM": "슬림탄탄",
                    "BTF_NORMAL": "보통",
                    "BTF_PLUMP": "통통한",
                    "BTF_GLAMOROUS": "글래머",
                    "ITM_01": "다정다감하고 누구에게나 친절한\n매너있는 사람이 좋아요",
                    "ITM_02": "위트있고 자신만의 개성이\n확실한 사람이 좋아요",
                    "ITM_03": "영화와 음악을 좋아하고\n문화활동을 즐기는 사람이 좋아요",
                    "ITM_04": "함께 다양한 활동을 같이 할 수 있는\n에너지 넘치는 사람이 좋아요",
                    "ITM_05": "가끔 같이 춤추고 신나게 노래부르며\n즐겁게 놀 수 있는 사람이 좋아요",
                    "ITM_06": "조용한 카페에서 책읽으며 \n이야기를 나눌 수 있는 사람이 좋아요",
                    "ITM_07": "패셔너블하고 자기 관리가\n뛰어난 사람이 좋아요",
                    "ITM_08": "사람들과 어울리는 것을 좋아하고\n열정이 넘치는 사람이 좋아요",
                    "ITM_09": "자기 일에 열정이 넘치고\n부지런한 사람이 좋아요",
                    "ITM_10": "미적감각이 있어서 예술방면에\n관심이 있는 사람이 좋아요",
                    "ITF_01": "다정다감하고 누구에게나 친절한\n매너있는 사람이 좋아요",
                    "ITF_02": "위트있고 자신만의 개성이\n확실한 사람이 좋아요",
                    "ITF_03": "영화와 음악을 좋아하고\n문화활동을 즐기는 사람이 좋아요",
                    "ITF_04": "함께 다양한 활동을 같이 할 수 있는\n에너지 넘치는 사람이 좋아요",
                    "ITF_05": "가끔 같이 춤추고 신나게 노래부르며\n즐겁게 놀 수 있는 사람이 좋아요",
                    "ITF_06": "조용한 카페에서 책읽으며 \n이야기를 나눌 수 있는 사람이 좋아요",
                    "ITF_07": "패셔너블하고 자기 관리가\n뛰어난 사람이 좋아요",
                    "ITF_08": "사람들과 어울리는 것을 좋아하고\n열정이 넘치는 사람이 좋아요",
                    "ITF_09": "자기 일에 열정이 넘치고\n부지런한 사람이 좋아요",
                    "ITF_10": "미적감각이 있어서 예술방면에\n관심이 있는 사람이 좋아요",
                    "HBB_MOVIE": "영화감상",
                    "HBB_RESTAURANT": "맛집탐방",
                    "HBB_EXHIBITION": "전시회",
                    "HBB_TRAVEL": "여행",
                    "HBB_BASEBALL": "야구",
                    "HBB_READING": "독서",
                    "HBB_WALK": "산책",
                    "HBB_INSTRUMENT": "악기연주",
                    "HBB_SONG": "노래",
                    "HBB_DANCE": "댄스",
                    "HBB_PHOTO": "사진촬영",
                    "HBB_MUSIC": "음악감상",
                    "HBB_LEISURE": "레져스포츠",
                    "HBB_PAINTING": "그림그리기",
                    "HBB_COOK": "요리",
                    "HBB_VOLUNTEER": "봉사활동",
                    "HBB_IT": "IT덕후",
                    "HBB_SHOPPING": "쇼핑",
                    "HBB_PET": "애완동물",
                    "HBB_FASHION": "패션",
                    "HBB_BYCYCLE": "자전거라이딩",
                    "HBB_DRAMA": "드라마",
                    "HBB_GAME": "게임",
                    "HBB_LOL": "소환사의 협곡",
                    "HBB_OVERWATCH": "오버워치",
                    "HBB_SCUBA": "스쿠버다이빙",
                    "HBB_CAMPING": "캠핑",
                    "CMT_01": "짙은 눈썹",
                    "CMT_02": "다정다감",
                    "CMT_03": "드라이빙을 즐겨요",
                    "CMT_04": "동안이에요",
                    "CMT_05": "체력이 좋아요",
                    "CMT_06": "허세 없어요",
                    "CMT_07": "오똑한 콧날",
                    "CMT_08": "탄탄한 몸매",
                    "CMT_09": "패션센스",
                    "CMT_10": "분위기 메이커",
                    "CMT_11": "자취해요",
                    "CMT_12": "섹시한 두뇌",
                    "CMT_13": "넓은 어깨",
                    "CMT_14": "시사에 밝아요",
                    "CMT_15": "상남자 스타일",
                    "CMT_16": "손재주가 많아요",
                    "CMT_17": "인테리어를 잘해요",
                    "CMT_18": "운동 감각이 있어요",
                    "CMT_19": "웃음이 많아요",
                    "CMT_20": "타투가 있어요",
                    "CMT_21": "피부가 깨끗해요",
                    "CMT_22": "유머감각",
                    "CMT_23": "요리실력",
                    "CFT_01": "큰 눈",
                    "CFT_02": "애교가 많아요",
                    "CFT_03": "동안이에요",
                    "CFT_04": "강아지상",
                    "CFT_05": "고양이상",
                    "CFT_06": "오똑한 콧날",
                    "CFT_07": "슬림한 몸매",
                    "CFT_08": "패션센스",
                    "CFT_09": "자취 해요",
                    "CFT_10": "섹시한 두뇌",
                    "CFT_11": "각선미",
                    "CFT_12": "시사에 밝아요",
                    "CFT_13": "골반 미녀",
                    "CFT_14": "드라이빙을 즐겨요",
                    "CFT_15": "뭐든 잘 먹어요",
                    "CFT_16": "운동 감각",
                    "CFT_17": "웃음이 많아요",
                    "CFT_18": "섹시한 타투",
                    "CFT_19": "피부가 깨끗해요",
                    "CFT_20": "타고난 유머 감각",
                    "CFT_21": "빼어난 요리 실력",
                    "CFT_22": "인터리어를 잘해요",
                    "FAV_01": "잘 들어주는 사람",
                    "FAV_02": "유머러스한 사람",
                    "FAV_03": "자주 연락하는 사람",
                    "FAV_04": "대화가 많은 사람",
                    "FAV_05": "배울점이 많은 사람",
                    "FAV_06": "귀여운 사람",
                    "FAV_07": "자기 일에 충실한 사람",
                    "FAV_08": "애교 많은 사람",
                    "FAV_09": "허세 없는 사람",
                    "FAV_10": "함께 많은 시간을 보낼 수 있는 사람",
                    "FAV_11": "털털한 사람",
                    "FAV_12": "예의바른 사람",
                    "FAV_13": "사람들 잘 챙기는 사람"
                };
                $scope.getCodeAndValue = function (code) {
                    if (!code)
                        return;
                    if (typeof code === "object" && code.length) {
                        return code.map(c => $scope.getCodeAndValue(c));
                    }
                    return values[code];
                };
            }
        };
    }
})();