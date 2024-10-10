<?php
    // Extract block class by removing 'acf/' prefix from the block name
    $block_class = 'adswcblock--' . str_replace('acf/', '', $block['name']);

    // Get all ACF fields for this block
    $blockFields = get_fields();

    // Safely check if fields exist before processing
    if (!$blockFields) {
        return; // Exit if no fields are present
    }

    // Get custom block settings (if you have a custom function for settings)
    $block_settings = adswcblock_custom_settings($block, $blockFields);

    // Set up CSS classes, ensuring it falls back to just the block class if settings are empty
    $classes = isset($block_settings['classes']) ? 'adswcblock--weather ' . $block_settings['classes'] : 'adswcblock--weather';

    // Generate a unique ID for the block
    $id = str_replace('acf/', '', $block['name']) . '-' . $block['id'];
?>

<div id="<?= $id ?>" class="<?= $classes ?>">
	<?php if ($is_preview) : ?>
		<span class="block-badge"><?= $block['title'] ?></span>
	<?php endif; ?>

    <div class="<?= $block_class; ?>__container container">


        <div id="weather-box" 
            class="weather-block weather-days-<?= $blockFields['show_days']; ?>"
            data-show-days="<?= $blockFields['show_days']; ?>"
            data-location-coordinates="<?= $blockFields['location_coordinates']; ?>"
            data-location-name="<?= $blockFields['location_name']; ?>">
        </div>


    </div>
</div>