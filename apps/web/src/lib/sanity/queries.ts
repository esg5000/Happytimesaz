export const q = {
  latestPosts: (categorySlug?: string) => {
    const catFilter = categorySlug ? `&& category->slug.current == "${categorySlug}"` : ''
    // Newest first within the (optional) category filter; fall back if publishedAt is missing
    return `*[_type=="post" ${catFilter}]|order(coalesce(publishedAt, _updatedAt) desc)[0...30]{
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category->{title, slug},
      "heroImage": coalesce(heroImage, mainImage){
        hotspot,
        crop,
        asset->{
          _id,
          url,
          metadata{
            dimensions
          }
        }
      },
      readTime
    }`
  },
  postBySlug: `*[_type=="post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    category->{title, slug},
    "heroImage": coalesce(heroImage, mainImage){
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        hotspot,
        crop,
        asset->{
          _id,
          url,
          metadata{
            dimensions
          }
        }
      }
    },
    readTime
  }`,
  listingsByType: `*[_type=="listing" && listingType == $type]|order(featured desc, name asc)[0...60]{
    _id,
    name,
    slug,
    listingType,
    city,
    address,
    location,
    "heroImage": coalesce(heroImage, mainImage){
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    website,
    phone,
    hours,
    amenities,
    featured
  }`,
  listingBySlug: `*[_type=="listing" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    listingType,
    city,
    address,
    location,
    "heroImage": coalesce(heroImage, mainImage){
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    website,
    phone,
    description,
    hours,
    amenities,
    socials,
    featured
  }`,
  dealsFeatured: `*[_type=="deal" && featured == true]|order(priority desc, startDate desc)[0...12]{
    _id,
    title,
    slug,
    brandName,
    dispensaryName,
    city,
    startDate,
    endDate,
    terms,
    "heroImage": coalesce(heroImage, mainImage){
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    link
  }`,
  eventsUpcoming: `*[_type=="event" && coalesce(isActive, true) != false && coalesce(date, dateTime) >= now()]|order(coalesce(date, dateTime) asc)[0...30]{
    _id,
    title,
    slug,
    "dateTime": coalesce(date, dateTime),
    endDate,
    "venueName": coalesce(venue, venueName),
    address,
    city,
    description,
    "heroImage": coalesce(image, heroImage){
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    "link": coalesce(ticketUrl, link),
    ticketUrl,
    price,
    categories,
    featured,
    isActive,
    source
  }`,
  adByPlacement: (placement: string) => `*[_type=="ad" && placement == $placement && (isActive == true || active == true) && (!defined(startDate) || startDate <= now()) && (!defined(endDate) || endDate >= now())]|order(priority desc)[0]{
    _id,
    title,
    advertiser,
    placement,
    adType,
    image{
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    html,
    headline,
    cta,
    linkUrl,
    priority
  }`,
  activeRadioStations: `*[_type=="radioStation" && active == true]|order(order asc){
    _id,
    title,
    streamUrl,
    active,
    order,
    coverImage{
      hotspot,
      crop,
      asset->{
        _id,
        url,
        metadata{
          dimensions
        }
      }
    },
    genre
  }`,
  homepageSettings: `*[_type == "homepageSettings"]|order(_updatedAt desc)[0]{
    featuredThemeLabel,
    featuredHeadline,
    featuredSubheadline,
    featuredCtaLabel,
    featuredCtaUrl,
    featuredImage{
      hotspot,
      crop,
      asset->{ _id, url }
    },
    tileTop{
      title,
      categoryTag,
      linkUrl,
      image{
        hotspot,
        crop,
        asset->{ _id, url }
      }
    },
    tileBottom{
      title,
      categoryTag,
      linkUrl,
      image{
        hotspot,
        crop,
        asset->{ _id, url }
      }
    }
  }`,
  // Same category as the current article when $categorySlug is set; always newest-first by publish date
  relatedPosts: `*[
    _type == "post" &&
    slug.current != $slug &&
    (!defined($categorySlug) || category->slug.current == $categorySlug)
  ]|order(coalesce(publishedAt, _updatedAt) desc)[0...8]{
    _id,
    title,
    slug,
    excerpt,
    readTime,
    publishedAt,
    category->{title, slug},
    "heroImage": coalesce(heroImage, mainImage){
      hotspot,
      crop,
      asset->{ _id, url, metadata{ dimensions } }
    }
  }`
}
