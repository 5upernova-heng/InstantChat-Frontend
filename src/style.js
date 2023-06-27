const backgroundColors = [
    '#F44336', '#E91E63', '#9C27B0',
    '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688',
    '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548', '#607D8B',
]

const avatarSize = {
    "sm": "3rem",
    "md": "4rem",
    "lg": "5rem",
}

const avatarFontSize = {
    "sm": "1.8rem",
    "md": "2rem",
    "lg": "2.5rem",
}

const roleAlignStyle = {
    "user": "justify-content-end",
    "others": "justify-content-start",
}

const roleBackgroundStyle = {
    "user": "bg-primary",
    "others": "bg-white",
}

const textColorStyle = {
    "user": "text-white",
    "others": "text-black",
}

const groupLevelLabel = ["Tiny", "Small", "Normal", "Large", "Tremendous"];

const groupLevelButtonStyle = groupLevelLabel.map((label) => {
    return {label, style: "btn btn-sm btn-outline-secondary"};
});

const parseButtonInfo = (style, activeIndex) => {
    return style.map((button, index) => {
        button.isActive = index === activeIndex;
        return button;
    });
};

export default {
    // avatar
    backgroundColors,
    avatarSize,
    avatarFontSize,
    // message
    roleAlignStyle,
    roleBackgroundStyle,
    textColorStyle,
    // group
    parseButtonInfo,
    groupLevelLabel,
    groupLevelButtonStyle,
}
