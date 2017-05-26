// JavaScript Document
$(function (){
	
	//搜索切换
	(function(){
		var aLi = $('#menu li');
		var oText = $('#search').find('.form .text');
		var arrText=[
			'例如：荷塘鱼妨烧鱼或日本樱花料理',
			'例如：昌平区育新车站龙旗广场',
			'万达影院双人情侣券',
			'出事了大老虎是谁？',
			'北京又降雪，天气变幻莫测'
		];
		var iNow = 0;
		oText.val(arrText[iNow]);
		aLi.each(function(index){
			$(this).click(function(){
				iNow = index;
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				oText.val(arrText[iNow]);
				});
			});
		oText.focus(function(){
			if($(this).val()==arrText[iNow]){
				$(this).val('');
				}
			});
		oText.blur(function(){
			if($(this).val()==''){
				$(this).val(arrText[iNow]);
				}
			});
		
		})();//闭包管理
		
		//update 文字滚动
		(function(){
			var oUpdate =$('.update');
			var oUl = oUpdate.find('ul');
			var iH = 0;
			var str='';
			var oBtnUp = $('#updateUpbtn');
			var oBtnDown = $('#updateDownbtn');
			var iNow = 0;
			var timer=null;
			var arrData =[
							{'name':'萱萱','time':5,'title':'那些灿烂的美丽瞬间','url':'http://www.baidu.com'},
							{'name':'花花','time':6,'title':'璀璨星河等你来探索','url':'http://www.baidu.com'},
							{'name':'牛牛','time':7,'title':'红通第一人国外悲惨','url':'http://www.baidu.com'},
							{'name':'亮亮','time':8,'title':'天舟一号成功发射','url':'http://www.baidu.com'},
							{'name':'草草','time':9,'title':'天舟一号成功对接','url':'http://www.baidu.com'}
						];
			 for(var i=0;i<arrData.length;i++){
				 str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span> 写了篇文章：'+arrData[i].title+'</a></li>';
				 }	
			oUl.html(str);	
			iH = oUl.find('li').height();
			
			oBtnUp.click(function(){
				 doMove(-1);
				});
			oBtnDown.click(function(){
				 doMove(1);
				});
			oUpdate.hover(function(){
				 clearInterval(timer);
				},autoPlay);	
				
			//oUl.animate({'top':iH*-1},3000,'elasticOut');
		function autoPlay (){
			timer=setInterval(function(){
				doMove(-1);
				},2000);
			}	
		 autoPlay();	
			function doMove (num){
				iNow +=num;
				if(Math.abs(iNow)>arrData.length-1){
					iNow=0;
					}
				if(iNow>0){
					iNow=-(arrData.length-1);//注意为负值
					}
				
				oUl.stop().animate({'top':iH*iNow},2000,'elasticOut');//先停止之前的动画，避免动画叠加
				} 
			})();
			
	//选项卡切换
	(function(){
		fnTab($('.tabNav1'),$('.tabCon1'),'click');
		fnTab($('.tabNav2'),$('.tabCon2'),'click');
		fnTab($('.tabNav3'),$('.tabCon3'),'mouseover');
		fnTab($('.tabNav4'),$('.tabCon4'),'mouseover');
		function fnTab(oNav,aCon,sevent){
			var aElem = oNav.children();
			aCon.hide().eq(0).show();//初始化
			aElem.each(function(index){
				$(this).on(sevent,function(){//事件传入
					aElem.removeClass('active').addClass('gradient');//removeClass只会移除指定的class名
				    $(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class','triangle_down_gray');//因为class名只有一个所以可以用attr，attr把所有的class名改了，
					$(this).find('a').attr('class','triangle_down_red');
					
					aCon.hide().eq(index).show();
					});
				});	
		}
		})();
		
	//自动播放的焦点图
	(function(){
		 var oDiv = $('#fade');
		 var aUlLi = oDiv.find('ul li');
		 var aOlLi = oDiv.find('ol li');
		  var oP = oDiv.find('p');
		 var arrText = ['爸爸去哪儿～','光影下的美丽','美艳动人'];
		 var iNow=0;
		 var timer=null;
		 fnFade();
		 
		 aOlLi.click(function(){
			 iNow = $(this).index();
			 fnFade();
			 });
		 function autoPlay(){
			 
			 timer=setInterval(function (){
				 iNow++;
			     iNow%=arrText.length;
				 fnFade();
				 },2000);
			 }
			autoPlay();
		oDiv.hover(function(){clearInterval(timer);},autoPlay);
		function fnFade(){
			aUlLi.each(function(i){
				if(i!=iNow){
					aUlLi.eq(i).fadeOut().css('zIndex',1);
					aOlLi.eq(i).removeClass('active');
					}else{
						aUlLi.eq(i).fadeIn().css('zIndex',2);
						aOlLi.eq(i).addClass('active');
						}
				});
			oP.text(arrText[iNow]);
			}
		})();
		
		//日历提示说明
		(function (){
			var aSpan =$('.calendar h3 span');
			var aImg =  $('.calendar .img');
			var oDiv = $('.calendar_info');
			var oImg = oDiv.find('img');
			var oStrong = oDiv.find('strong');
			var oP = oDiv.find('p');
			var oImg1 = $('.activity .info').find('img');
			var oEm = $('.activity .info').find('em').eq(1);
			var oImg2 =$('.calendar .active');
			
			oImg1.attr('src',oImg2.attr('src'));
			oEm.text(oImg2.parent().text());
			
			aImg.hover(function(){
				var iTop = $(this).parent().position().top-30;
				var iLeft = $(this).parent().position().left+55;
				var index = $(this).parent().index()%aSpan.size();/*jquery长度用.size()*/
				
				oDiv.show().css({'left':iLeft,'top':iTop});
				oP.text($(this).attr('info'));
				oImg.attr('src',$(this).attr('src'));
				oStrong.text(aSpan.eq(index).text());
				},function(){
				 oDiv.hide();
				});
			
			})();
			
	//bbs高亮显示
	
	(function(){
		$('.bbs li').mouseover(function(){
			$('.bbs li').removeClass('active').eq($(this).index()).addClass('active');
			/*$(this).index(),当前索引值*/
			});
		/*aLi.each(function(index){
			aLi.mouseover(function(){
				aLi.removeClass('active');
		    	$(this).addClass('active');
				});
			
			});*/
		})();
		
	//鼠标提示效果
	(function(){
		var aLi = $('.hot_area ul li');
		var arr=[	'',
					'用户1<br/>人气1',
					'用户名：性感宝贝<br/>区域：朝阳CBD<br/>人气：124987',
					'用户3<br/>人气3',
					'用户4<br/>人气4',
					'用户5<br/>人气5',
					'用户6<br/>人气6',
					'用户7<br/>人气7',
					'用户8<br/>人气8',
					'用户9<br/>人气9',
					'用户10<br/>人气10',
					
	          ];
		
		
		aLi.mouseover(function(){
			if($(this).index()==0) return;
			$('.hot_area li p').remove();
			$(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</p>');
			 
			
			});
		})();
	});