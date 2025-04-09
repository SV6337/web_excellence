const container = document.getElementById("news-container");
const breakingText = document.getElementById("breaking-text");

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/")
  .then(response => response.json())
  .then(data => {
    const articles = data.items.slice(0, 10); // Top 10 articles

    // Breaking news - first headline
    breakingText.textContent = articles[0].title;

    articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${article.link}" target="_blank">
          <img src="${article.thumbnail}" alt="News image" />
        </a>
        <div class="card-content">
          <a href="${article.link}" target="_blank" class="card-title">${article.title}</a>
          <div class="card-meta">${article.pubDate.split(" ")[0]} | ${article.author || "TechCrunch"}</div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    breakingText.textContent = "Failed to load news. Please try again later.";
    console.error(err);
  });
