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
    $classes = isset($block_settings['classes']) ? 'adswcblock--countdown-timer ' . $block_settings['classes'] : 'adswcblock--countdown-timer';

    // Generate a unique ID for the block
    $id = str_replace('acf/', '', $block['name']) . '-' . $block['id'];

    // Safely get the countdown timer date, fallback to an empty string if it doesn't exist
    $countdown_timer_date = isset($blockFields['countdown_timer_date']) ? $blockFields['countdown_timer_date'] : '';
?>

<div id="<?= $id ?>" class="<?= $classes ?>">
	<?php if ($is_preview) : ?>
		<span class="block-badge"><?= $block['title'] ?></span>
	<?php endif; ?>

    <div class="<?= $block_class; ?>__container container">
        <div class="countdown-timer" data-countdown-timer-date="<?= $countdown_timer_date; ?>">
            <div id="countdown-block"></div>
        </div>
    </div>

</div>