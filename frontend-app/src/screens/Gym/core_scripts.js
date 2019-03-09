const config = require('../../config')
const {
    RESOURCE_CLOUD,
    DEFAULT_TOTAL_SETS,
    DEFAULT_READY,
    DEFAULT_ACTION,
    DEFAULT_REST,
    DEFAULT_REST_SET,
} = config

let totalSets = DEFAULT_TOTAL_SETS
let actions = [
    {
        name: 'toe touch',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'standard crunch',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'plant step',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'hands down the middle crunch',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'retractor',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'bicycle',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'one leg hold',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'plant bridge',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST,
    },
    {
        name: 'plant cross over',
        ready: DEFAULT_READY,
        go: DEFAULT_ACTION,
        rest: DEFAULT_REST_SET,
    },
]

const ASSETS_BLANK_PNG = require('../../../assets/blank.png')
const ASSETS = [
    require('../../../assets/core/1.gif'),
    require('../../../assets/core/2.gif'),
    require('../../../assets/core/3.gif'),
    require('../../../assets/core/4.gif'),
    require('../../../assets/core/5.gif'),
    require('../../../assets/core/6.gif'),
    require('../../../assets/core/7.gif'),
    require('../../../assets/core/8.gif'),
    require('../../../assets/core/9.gif'),
]

function createScripts() {
    var scripts = []
    for (var set = 1; set <= totalSets; set++) {
        for (var index = 0; index < actions.length; index++) {
            for (var second = 0; second < actions[index].ready; second++) {
                var script = {}

                script.setCountdown = actions[index].ready - second

                if (script.setCountdown <= 5 && script.setCountdown > 0) {
                    script.say = script.setCountdown.toString()
                }

                if (second == 0) {
                    script.setTitle = 'Get Ready'
                    script.setImage = ASSETS[index]
                    script.say = 'get ready for ' + actions[index].name
                }

                scripts.push(script)
            } //end ready

            for (second = 0; second < actions[index].go; second++) {
                var script = {}

                script.setCountdown = actions[index].go - second

                if (
                    script.setCountdown == 30 ||
                    script.setCountdown == 20 ||
                    (script.setCountdown <= 10 && script.setCountdown > 0)
                )
                    script.say = script.setCountdown.toString()

                if (second == 0) {
                    script.setTitle = 'Action'
                    script.say = 'action'
                    script.playMusic = true
                }

                scripts.push(script)
            } //end go

            for (second = 0; second < actions[index].rest; second++) {
                var script = {}

                script.setCountdown = actions[index].rest - second

                if (
                    script.setCountdown % 60 == 0 &&
                    script.setCountdown / 60 >= 1
                )
                    script.say =
                        (script.setCountdown / 60).toString() +
                        'minute remaining'

                if (script.setCountdown <= 10 && script.setCountdown > 0)
                    script.say = script.setCountdown.toString()

                if (second == 0) {
                    script.stopMusic = true
                    script.setImage = ASSETS_BLANK_PNG
                    script.setTitle = 'Rest'

                    if (index < actions.length - 1) {
                        script.say = 'rest'
                    } else if (set + 1 <= totalSets) {
                        script.say = 'rest for set ' + (set + 1).toString()
                    }
                }
                //最后一组的最后一次休息要skip掉
                if (set < totalSets || index < actions.length - 1)
                    scripts.push(script)
            } //end rest
        } //end action loop
    } //end set loop

    var script = {}
    script.say = 'Congratulations. Well done.'
    script.stopMusic = true
    script.setImage = ASSETS_BLANK_PNG
    scripts.push(script)

    return scripts
}

export default createScripts()
