
$.fn.extend(
        {
            bubble: function(config)
            {
                config = $.extend({
                    'left': 0,
                    'top': 0
                }, config);

                $(this).bind(
                        {
                            focus: function()
                            {
                                switch (config.position)
                                {
                                    case 'top':
                                        if ($(this).val().length == 0) {
                                            $(this).top(config);
                                        }
                                        break;
                                    default:
                                        if ($(this).val().length == 0) {
                                            $(this).top(config);
                                        }
                                        break;
                                }

                                $('.bubble-close').click(function()
                                {
                                    $('.bubble').remove();
                                });
                            },
                            focusout: function()
                            {
                                $('.bubble').remove();
                            }
                        });
            },
            top: function(config)
            {
                var bubble = $(this).calculateValues(config),
                        message = $.bubble[config.message];

                var htmlBubble = "<div class=\"bubble bubble-box-corner-top\" style=\"top: " + bubble.top + "px; left: " + bubble.left + "px; width: " + config.width + " \"><div class=\"bubble-close\">X</div><div class=\"bubbleContentText bubble-text-align-center\"> " + message + " </div><div class=\"bubbleArrow bubbleBottomArrow\"><div class=\"bubbleArrowBottomImplBefore\"></div><div class=\"bubbleArrowBottomImplAfter\"></div></div></div>";

                $('body').append(htmlBubble);
            },
            calculateValues: function(config)
            {
                var coordinates = $(this).getCoordinates(),
                        position = coordinates.position,
                        offset = coordinates.offset;

                var bubble = new Object();
                bubble.top = position.top + config.top,
                        bubble.left = offset.left - config.left;

                return bubble;
            },
            getCoordinates: function()
            {
                var coordinates = new Object();

                coordinates.position = $(this).position();
                coordinates.offset = $(this).offset();

                return coordinates;
            }
        });