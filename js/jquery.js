$(document).ready(function () {
  // Configuration
  const initialCards = 4;
  const cardsPerLoad = 4;
  const maxCards = 12;

  // State tracking
  let currentlyShown = initialCards;
  let isLoading = false;

  // Store total available cards
  const totalCards = $(".blog-card").length;

  // Initial setup - hide cards beyond initial count
  $(".blog-card:gt(" + (initialCards - 1) + ")").hide();

  // Hide button if no additional cards to show
  if (totalCards <= initialCards) {
    $(".latest-blog-btn").hide();
  }

  // Update button text based on current state
  function updateButtonText() {
    const $button = $(".latest-blog-btn button");

    if (currentlyShown >= maxCards || currentlyShown >= totalCards) {
      $button.text("Go to Blogs");
    } else {
      $button.text("Load More");
    }
  }

  // Handle loading of more cards
  function loadMoreCards() {
    const startIndex = currentlyShown;
    const endIndex = Math.min(currentlyShown + cardsPerLoad, totalCards);

    // Get the first new card that will be shown
    const $firstNewCard = $(".blog-card").eq(startIndex);

    // Show next batch of cards with animation
    $(".blog-card")
      .slice(startIndex, endIndex)
      .slideDown(600, function () {
        currentlyShown = endIndex;
        updateButtonText();

        // Scroll to the first new card
        $("html, body").animate(
          {
            scrollTop: $firstNewCard.offset().top - 100, // 100px offset for better visibility
          },
          800,
          function () {
            isLoading = false;
          }
        );
      });
  }

  // Button click handler
  $(".latest-blog-btn button").on("click", function (e) {
    e.preventDefault();

    // Prevent multiple clicks while loading
    if (isLoading) return;
    isLoading = true;

    const $button = $(this);
    $button.css("opacity", "0.7");

    // If all cards are shown, redirect to blogs page
    if (currentlyShown >= maxCards || currentlyShown >= totalCards) {
      window.location.href = "blogs.html";
      return;
    }

    // Add small delay for better UX
    setTimeout(function () {
      loadMoreCards();
      $button.css("opacity", "1");
    }, 200);
  });

  // Handle window resize
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $(".blog-card").hide().slice(0, currentlyShown).show();
    }, 250);
  });
});

// Add this to verify script is running
console.log("Enhanced blog loading functionality initialized");
