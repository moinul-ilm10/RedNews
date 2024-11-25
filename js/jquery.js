$(document).ready(function () {
  // Default number of cards to show initially and per load
  const cardsToShow = 4;

  // Hide all cards beyond the initial count
  $(".blog-card:gt(" + (cardsToShow - 1) + ")").hide();

  // Store total number of cards
  const totalCards = $(".blog-card").length;

  // Hide the button if there aren't more cards to show
  if (totalCards <= cardsToShow) {
    $(".latest-blog-btn").hide();
  }

  // Track whether cards are expanded
  let isExpanded = false;

  // Add loading state flag
  let isLoading = false;

  $(".latest-blog-btn button").on("click", function () {
    // Prevent multiple clicks while loading
    if (isLoading) return;

    isLoading = true;
    const $button = $(this);

    // Add loading indicator
    $button.css("opacity", "0.7");

    setTimeout(function () {
      // Adding small delay for smooth transition
      if (!isExpanded) {
        // Show all hidden cards with animation
        $(".blog-card:gt(" + (cardsToShow - 1) + ")").slideDown(
          400,
          function () {
            $button.text("Load Less");
            isExpanded = true;
            isLoading = false;
            $button.css("opacity", "1");
          }
        );
      } else {
        // Hide cards beyond initial count with animation
        $(".blog-card:gt(" + (cardsToShow - 1) + ")").slideUp(400, function () {
          $button.text("Load More");
          isExpanded = false;
          isLoading = false;
          $button.css("opacity", "1");

          // Scroll to last visible card if needed
          const $lastVisibleCard = $(
            ".blog-card:eq(" + (cardsToShow - 1) + ")"
          );
          if ($lastVisibleCard.length) {
            $("html, body").animate(
              {
                scrollTop: $lastVisibleCard.offset().top - 100,
              },
              300
            );
          }
        });
      }
    }, 200);
  });

  // Optional: Add window resize handler to maintain layout
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Ensure proper layout after resize
      if (isExpanded) {
        $(".blog-card:gt(" + (cardsToShow - 1) + ")").show();
      } else {
        $(".blog-card:gt(" + (cardsToShow - 1) + ")").hide();
      }
    }, 250);
  });
});
