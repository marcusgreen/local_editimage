<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
/**
 *
 * @package    local_editimage
 * @copyright  2021 Marcus Green
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
require_once(__DIR__ . '/../../config.php');
require_once($CFG->libdir . '/formslib.php');
require_login();

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/local/editimage/index.php');
MoodleQuickForm::registerElementType('singleimage', __DIR__."/singleimage.php", 'MoodleQuickForm_singleimage');
class local_editimage_form extends moodleform {

    protected function definition() {
        global $PAGE;
        $params = ['param1', 'param2'];
        //$PAGE->requires->js_call_amd('local_editimage/image_editable', 'init', $params);
        $mform = $this->_form;
        $singleimageoptions = [
            'maxbytes' => 100,
            'component' => 'core_course',
            'filearea' => 'overviewfiles',
            'currentimage' => '',
            'contextid' => ''
        ];
        $mform->addElement('singleimage', 'sampleimage', "Sample Image", null, $singleimageoptions);
    }
}


$mform = new local_editimage_form();

echo $OUTPUT->header();
$mform->display();
echo $OUTPUT->footer();
