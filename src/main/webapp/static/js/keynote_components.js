$.fn.actionize = function(b) {
	var c, a, f = false;
	var e = 200;
	var d = $(this).next();
	b || (b = {});
	if (typeof b == "string") {
		a = b
	} else {
		a = b.anchorTo;
		f = b.autoclose
	}
	d.children().bind("mouseover", function() {
		$(this).addClass("highlight")
	}).bind("mouseout", function() {
		$(this).removeClass("highlight")
	}).on("click", function() {
		if (f) {
			d.slideUp("fast")
		}
	});
	d.bind("mouseenter", function() {
		clearTimeout(c)
	}).bind("mouseleave", function(h) {
		var g = $(this);
		c = setTimeout(function() {
			g.slideUp("fast")
		}, e)
	}).setPosition(this, "center");
	$(this).bind("click", function(g) {
		d.setPosition(this, a).slideDown("fast");
		g.preventDefault();
		g.stopPropagation()
	}).bind("mouseleave", function(h) {
		var g = $(this).position().top;
		if (h.clientY < g + $(this).outerHeight()) {
			c = setTimeout(function() {
				d.slideUp("fast")
			}, 400)
		} else {
			c = setTimeout(function() {
				d.slideUp("fast")
			}, 2000)
		}
		h.preventDefault()
	});
	return this
};
$.fn.setPosition = function(d, g) {
	var f = $(d);
	var a = f.offset().left;
	var e = a + f.outerWidth();
	var c = {
		top : f.offset().top + f.outerHeight()
	};
	var b = $(window).width();
	if (g == "right") {
		c.left = e - $(this).outerWidth()
	} else {
		c.left = a
	}
	$(this).css(c);
	return this
};
$.fn.respotMenu = function() {
	$(this).next().css({
		top : $(this).position().top + $(this).outerHeight()
	})
};
$(document).ready(function() {
	$(".actionmenu").each(function() {
		$(this).actionize("right")
	})
});
$(window).resize(function() {
	$(".actionmenu").each(function() {
		$(this).respotMenu()
	})
});
$.fn.alignNav = function(e) {
	var l = $(e.element), j, f = $(this), g = l.position().left, a = g
			+ l.outerWidth(), c = $(window).width();
	if (e.align == "right") {
		f.css("left", a - f.outerWidth())
	} else {
		if (e.align == "center") {
			var i = l.outerWidth(), k = f.outerWidth(), b = $("#sidePanel")
					.outerWidth() == null ? 0 : $("#sidePanel").outerWidth(), d = -(k / 2 - i / 2), h = g
					+ (k + d + b);
			if (h > c) {
				f.css("right", "0")
			} else {
				f.addClass("center").css("left", d)
			}
		} else {
			f.css("left", g)
		}
	}
	j = f.prev();
	f.css("top", j.position().top + j.outerHeight());
	return this
};
$.fn.buildNav = function(c) {
	var b;
	function a(d) {
		clearTimeout(b);
		$("#mainnav .subnav").hide();
		$(this).removeClass("menuActive")
	}
	$(this).addClass("mainnav").children("li").addClass("lvl1");
	$(".lvl1 ul").addClass("subnav");
	$(".hassubmenu").bind("mouseenter", function(d) {
		a(d);
		$(this).addClass("menuActive");
		var f = $(this).find(".subnav");
		f.bind("mouseleave", function() {
			t = setTimeout(function() {
				$(this).hide()
			}, 400)
		}).alignNav({
			element : this,
			align : c.align
		});
		if ($("body").attr("id") == "ie7orless") {
			f.show()
		} else {
			f.animate({
				height : "toggle"
			}, {
				duration : 100,
				specialEasing : {
					height : "easeOutCirc"
				}
			})
		}
	}).bind("mouseleave", a)
};
function setPageMessage(g, h, f, e, c, d, b, a) {
	setPageMessage2({
		messageID : e,
		containerId : b,
		html : g,
		type : h,
		allowMultiple : f,
		fadeOutTimer : c,
		isNotFadeOut : d,
		hideCloseButton : a
	})
}
function setPageMessage2(f) {
	if ($("#page")) {
		var e = "";
		if (!f.messageID) {
			f.messageID = "pageMessage1"
		}
		f.fadeOutTimer || (f.fadeOutTimer = 6500);
		if (f.type == "error") {
			if (!f.isNotFadeOut) {
				setTimeout(rollUp, f.fadeOutTimer)
			} else {
				f.isNotFadeOut = true
			}
		}
		if ($(f.messageID) && !f.allowMultiple) {
			$("#" + f.messageID).remove()
		}
		var d = "";
		if (!f.hideCloseButton) {
			if (!f.containerId) {
				d += '<a class="closeIcon fa fa-times" href="javascript:void(0)" onclick="rollUp(this.parentNode)">&nbsp;</a>'
			} else {
				d += '<a href="javascript:void(0)" onclick="hide(this.parentNode)" title="Dismiss Message" class="closeIcon fr">&nbsp;</a>'
			}
		}
		if (!f.containerId) {
			d += "<p>" + f.html + "</p>"
		} else {
			d += f.html
		}
		var b = $("<div />").attr("id", f.messageID).addClass("pageMessage cb")
				.append(d);
		if (f.type) {
			b.addClass(f.type)
		}
		if (f.containerId) {
			var a = (f.containerId.indexOf("#") == 0) ? f.containerId : "#"
					+ f.containerId;
			$(a).append(b)
		} else {
			var c;
			switch (f.type) {
			case "error":
				c = "fa-times-circle";
				break;
			case "success":
				c = "fa-check-circle";
				break;
			case "info":
				c = "fa-info-circle";
				break;
			default:
				c = "fa-exclamation-triangle"
			}
			b.addClass("pageLevelMessage").prepend(
					"<i class='fa " + c + "'></i>");
			$("#header").before(b);
			setTimeout(rollDown, 500)
		}
		if (!f.isNotFadeOut) {
			setTimeout(rollUp, f.fadeOutTimer)
		}
		if (f.hideCloseButton) {
			$("#" + f.messageID + " .closeIcon").hide()
		}
	}
}
function rollUp(a) {
	a || (a = "#pageMessage1");
	$(a).animate({
		top : 0
	}, "fast", function() {
		$(this).remove()
	})
}
function rollDown() {
	$("#pageMessage1").animate({
		top : "49px"
	}, "fast")
}
function showZeroStatePageMessage(a, b) {
	setPageMessage2({
		html : a,
		type : b,
		isNotFadeOut : true
	})
}
function setCookie(a, d, b) {
	var e = new Date();
	e.setDate(e.getDate() + b);
	var c = escape(d) + ((b == null) ? "" : "; expires=" + e.toUTCString());
	document.cookie = a + "=" + c
}
function getCookie(b) {
	var d = document.cookie.split(";");
	for (var c = 0; c < d.length; c++) {
		var a = d[c].substr(0, d[c].indexOf("="));
		var e = d[c].substr(d[c].indexOf("=") + 1);
		a = a.replace(/^\s+|\s+$/g, "");
		if (a == b) {
			return unescape(e)
		}
	}
}
function deleteCookie(a) {
	var b = getCookie(a) != null;
	if (b) {
		setCookie(a, "", -1)
	}
}
var globalPref = {
	data : {},
	getPrefs : function(c) {
		var a = "editnotes.do";
		var b = this;
		$.ajaxSetup({
			cache : false
		});
		$.getJSON(a, function(d) {
			b.data = d;
			if (typeof c != "undefined") {
				c()
			}
		})
	},
	setPrefs : function() {
		var a = "validateeditnotes.aspx?NOTES=" + JSON.stringify(this.data);
		$.get(a)
	},
	setPref : function(e) {
		var b = e.name;
		var d = e.value;
		var c = e.isDelete;
		var a = "editnotes.do";
		$.ajaxSetup({
			cache : false
		});
		$.getJSON(a, function(f) {
			if (c) {
				delete f[b]
			} else {
				f[b] = d
			}
			var g = "validateeditnotes.aspx?NOTES=" + JSON.stringify(f);
			$.get(g)
		})
	},
	deletePref : function(a) {
		setPref({
			name : a,
			isDelete : 1
		})
	},
	resetPrefs : function() {
		var a = "validateeditnotes.aspx?NOTES=";
		$.get(a)
	}
};
function buildDatepicker(b, c, d) {
	if (typeof b == "object") {
		var f = b.maxDate;
		var e = b.minDate;
		var d = b.icon || "fa fa-calendar";
		var g = b.id
	}
	if (!f) {
		var f = "12/31/2160"
	}
	if (!e) {
		var e = "01/01/1900"
	}
	var a = {
		showOn : "both",
		changeMonth : true,
		changeYear : true,
		dateFormat : "mm/dd/yy",
		showButtonPanel : true,
		minDate : e,
		maxDate : f,
		buttonText : "Show calendar"
	};
	if (!d) {
		$.extend(a, {
			buttonImage : "images/icon_calendar.png",
			buttonImageOnly : true
		});
		$("#" + g).datepicker(a)
	} else {
		$("#" + g).datepicker(a).next("button").html('<i class="' + d + '" />')
	}
}
function delegateTooltips(c, a, b) {
	console.log("DELEGATING TOOLTIPS.  arguments: ", arguments);
	$(c).delegate(
			a,
			"mouseover",
			function(e) {
				if ($(this).hasClass("tooltipped")) {
					console.log("already initialized. returning.");
					return
				}
				if (!$(this).attr("title")) {
					$(this).attr("title", "")
				}
				var d = {
					position : {
						my : "center bottom-10",
						at : "center top",
						collision : "flipfit",
						using : function(f, g) {
							$(this).css(f);
							var h = $("<div class='arrow' />").addClass(
									g.vertical).css({
								left : g.element.width / 2 - 18
							});
							$(this).append(h);
							h = null
						}
					},
					show : {
						effect : "none"
					},
					hide : {
						effect : "none"
					},
					content : function() {
						return $(this).attr("title")
								|| $(this).next(".tooltip").html()
					}
				};
				if (b) {
					$.extend(d, b)
				}
				console.log("initializing tooltip");
				$(this).addClass("tooltipped").tooltip(d).trigger("mouseover");
				d = null
			})
}
function buildToolTips(a, b) {
	$(a).each(
			function() {
				if (!$(this).attr("title")) {
					$(this).attr("title", "")
				}
				var c = {
					position : {
						my : "center bottom-10",
						at : "center top",
						collision : "flipfit",
						using : function(d, e) {
							$(this).css(d);
							var f = $("<div class='arrow' />").addClass(
									e.vertical).css({
								left : e.element.width / 2 - 18
							});
							$(this).append(f);
							f = null
						}
					},
					show : {
						effect : "none"
					},
					hide : {
						effect : "none"
					},
					content : function() {
						return $(this).attr("title")
								|| $(this).next(".tooltip").html()
					}
				};
				if (b) {
					$.extend(c, b)
				}
				$(this).tooltip(c);
				c = null
			})
}
var ValidateUtil = {
	isEmpty : function(d, e, c, b) {
		var a = false;
		if (d.value.trim().length == 0) {
			setPageMessage2({
				html : e + " must not be empty.",
				type : "error",
				containerId : c,
				isNotFadeOut : true,
				hideCloseButton : b
			});
			a = true;
			d.focus()
		}
		return a
	},
	isNonAscii : function(c, e) {
		var a = false;
		var d = c.value.trim();
		for (var b = 0; b < d.length; b++) {
			if (d.charCodeAt(b) > 127) {
				setPageMessage("Non-ascii characters are not allowed in " + e
						+ ".", "error");
				a = true;
				break
			}
		}
		return a
	},
	exceedsMaxLength : function(c, d, b) {
		var a = false;
		if (c.value.trim().length > b) {
			setPageMessage(d + " must not exceed " + b + " characters.",
					"error");
			a = true
		}
		return a
	},
	isSelected : function(b, d, c) {
		var a = true;
		if (!$("input[name=" + b + "]:checked").val()) {
			setPageMessage2({
				html : "An option from the <strong><em>" + d
						+ "</em></strong> section must be selected.",
				type : "error",
				containerId : c,
				isNotFadeOut : true
			});
			a = false
		}
		return a
	},
	isValidEmailFormat : function(d, f, c, b) {
		var a = true;
		var e = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
		if (!e.test(d.value)) {
			setPageMessage2({
				html : f + " format is invalid.",
				type : "error",
				containerId : c,
				isNotFadeOut : true,
				hideCloseButton : b
			});
			a = false
		}
		return a
	},
	isValidDateFormat : function(c, e, b) {
		var a = true;
		var d = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
		if (!d.test(c.value)) {
			setPageMessage2({
				html : e + " format is invalid.",
				type : "error",
				containerId : b,
				isNotFadeOut : true
			});
			a = false
		}
		return a
	},
	hasTooManyOptions : function(c, b) {
		var a = false;
		if ($("#" + c + " option").length > b) {
			a = true
		}
		return a
	}
};
function filterURL(e) {
	var b = 36;
	if (e.match("http://") || e.match("https://")) {
		var c = e.split("/"), d = 1, a;
		while (!a) {
			a = c[ArraySize(c) - d];
			++d
		}
		if (a.split("?")[0]) {
			a = a.split("?")[0]
		}
		return a.truncate(b)
	} else {
		return e.truncate(b)
	}
}
function ArraySize(c) {
	var b = 0, a;
	for (a in c) {
		if (c.hasOwnProperty(a)) {
			b++
		}
	}
	return b
};