This PR implements dynamic loading for the skills and projects sections in the portfolio, along with documentation updates, new asset checking tools, and fixes for ESM compilation warnings.

## Changes Made

### Features
- **Skills Section**: Added JavaScript to dynamically populate 6 skill cards with SVG icons, titles, and descriptions
- **Projects Section**: Implemented dynamic project cards with images, descriptions, tech tags, and links
- **Project Modal**: Integrated interactive modal functionality for detailed project views with embeds and external links
- **Interactivity**: Enhanced with proper event handling, accessibility features, and responsive design

### Tools & Optimization
- Added `tools/check-assets.js` for checking asset references and optimization
- Added `tools/check-assets-local.js` for local asset validation
- These tools help ensure proper asset loading and performance optimization

### Documentation
- Updated README.md with latest project information and setup instructions
- Modified package.json to reflect current dependencies and scripts
- Improved documentation for dynamic loading features and project structure

### Fixes
- Added `"type": "module"` to package.json to resolve Node.js ESM compilation warnings
- Ensures proper handling of ES modules in the project

## Technical Details

- Uses vanilla JavaScript for DOM manipulation
- Maintains existing CSS styling and responsive design
- Includes proper ARIA attributes for accessibility
- Supports both light and dark themes
- Compatible with existing contact form and theme toggle functionality

## Testing

- Verified skills cards load correctly with icons and content
- Confirmed project cards display with proper links and modal integration
- Tested modal opening/closing and keyboard navigation
- Ensured responsive layout works on different screen sizes

## Files Changed
- `index.html`: Added dynamic loading JavaScript for skills and projects
- `README.md`: Updated documentation
- `package.json`: Updated project metadata and added type module
- `tools/check-assets.js`: New asset checking tool
- `tools/check-assets-local.js`: New local asset validation tool

## Repository Cleanup
- Removed temporary Lighthouse artifacts and reports
- Removed development tools and scripts
- Removed original images (keeping optimized webp versions)
- Removed week2 directory and related files
- Kept only essential files for portfolio deployment

Closes #portfolio-upgrade
